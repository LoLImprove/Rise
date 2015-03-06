Template.ReplayNew.created = function() {
  Session.setDefault('replay:new-instance', {});
}

Template.ReplayNew.helpers({
  newReplay: function() {
    return Session.get('replay:new-instance');
  },
  submitForm: function() {
    return function(e, id) {
      Rise.Modal._defaultOnValidate(e, id);
      return false; // We want validation first
    }
  }
});

Template.ReplayNew.events({
  'change input, keyup input, blur input': function() {
    Session.set('replay:new-instance', AutoForm.getFormValues('replay-new-form').insertDoc);
  }
});

AutoForm.hooks({
  'replay-new-form': {
    formToDoc: function(doc, ss, formId) {
      doc.user_id = Meteor.userId();

      return doc;
    },
    before: {
      // Before insert we upload files to AWS if the document is valid
      insert: function(doc, template) {
        // For validation to pass
        doc.created_at = doc.updated_at = new Date();
        var isValid = Rise.Schemas.Replays.namedContext("beforeInsert").validate(doc);
        // Reset timestamps, it's handled by behaviors server side
        delete doc.created_at
        delete doc.updated_at

        if (isValid) {
          var self  = this,
              files = template.$("input[type=file]")[0].files;

          if (files.length > 0) {
            var maybeAnError = Rise.Files.upload(files, { dir: "/replays", allow: "applications" }, function(e, result) {
              doc.replay_file = result.url;
              self.result(doc);
            });

            // If the pre-upload validation gave us an error back, we throw it
            // TODO: Display this error
            if (maybeAnError) {
              throw maybeAnError;
            }
          } else {
            return doc;
          }
        } else {
          return false;
        }
      },
    },
    onSuccess: function(operation, id, template) {
      Router.go('replay', { _id: id });
    },
    onError: function(operation, error, template) {
      console.error('Trying to create a new replay but there was an error on ' + operation + ':', error);
    },
  }
});
