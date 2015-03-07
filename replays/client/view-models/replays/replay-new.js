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
    // AWS S3 Upload
    // Messiest method on earth
    before: {
      // Before insert we upload files to AWS if the document is valid
      insert: function(doc, template) {
        var input = template.$('input[name="replay_file"]');

        // For validation to pass
        doc.created_at = doc.updated_at = new Date();
        var isValid = Rise.Schemas.Replays.namedContext("beforeInsert").validate(doc);
        // Reset timestamps, it's handled by behaviors server side
        delete doc.created_at
        delete doc.updated_at

        if (isValid) {
          // If form is valid, remove previous upload errors
          input.parent('.form-group').removeClass('has-error');
          input.siblings('.help-block').html('');

          var self  = this,
              files = template.$("input[type=file]")[0].files;

          if (files.length > 0) {
            var maybeAnError = Rise.Files.upload(files, { dir: "/replays", allow: "applications" }, function(error, result) {
              // TODO: Display a spinny-thingy
              if (!error) {
                doc.replay_file = result.url;
                self.result(doc);
              }
            });

            // If the pre-upload validation gave us an error back, we throw it
            if (maybeAnError) {
              input.parent('.form-group').addClass('has-error');
              input.siblings('.help-block').html(maybeAnError.reason);

              return false; // If there is an error with upload we return false
            }
            // Otherwise we don't return as it the return is handleded asynchronously with self.result(doc);
          } else {
            return doc; // If we did not have any file to upload we return the doc
          }
        } else {
          return doc; // If the doc is invalid we return the doc for autoform to handle
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
