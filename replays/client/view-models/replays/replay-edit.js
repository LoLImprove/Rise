Template.ReplayEdit.helpers({
  replay: function() {
    return Session.get('replay:current-instance');
  },
  submitEdit: function() {
    return function(e, id) {
      Rise.Modal._defaultOnValidate(e, id);
      console.log('submit called');
      return false; // We want validation first
    }
  },
  cancelEdit: function() {
    return function(e) {
      Session.set('replay:edit-mode', false);
      return true;
    }
  }
});

Template.ReplayEdit.events({
  'change input, keyup input, blur input': function() {
    var currentValues = Session.get('replay:current-instance'),
        newValues     = AutoForm.getFormValues('replay-edit-form').insertDoc;
    Session.set('replay:current-instance', _.extend(currentValues, newValues));
  }
});

AutoForm.hooks({
  'replay-edit-form': {
    before: {
      update: function(docId, modifier, template) {
        var input = template.$('input[name="replay_file"]');
        input.parent('.form-group').removeClass('has-error');
        input.siblings('.help-block').html('');

        var self = this,
            doc  = Rise.Replays.findOne(docId),
            curFile = doc.replay_file,
            files   = template.$("input[type=file]")[0].files;

        if (files.length > 0) {
          var maybeAnError = Rise.Files.upload(files, { dir: "/replays", allow: "applications" }, function(error, result) {
            if (!error) {
              Rise.Files.delete(doc, curFile, function(e, r) { console.log(e,r); });

              modifier.$set.replay_file = result.url;
              self.result(modifier);
            }
          });

          // If the pre-upload validation gave us an error back, we throw it
          // TODO: Display this error
          if (maybeAnError) {
            input.parent('.form-group').addClass('has-error');
            input.siblings('.help-block').html(maybeAnError.reason);

            return false;
          }
        } else {
          return modifier;
        }
      },
    },

    onSuccess: function(operation, id, template) {
      Session.set('replay:edit-mode', false);
      //Router.go('replay', { _id: id });
    },
    onError: function(operation, error, template) {
      console.error('Trying to ' + operation + ' update the replay but there was an error on :', error);
      Rise.UI.Form.ShowErrors(template, error);
    },
  }
});
