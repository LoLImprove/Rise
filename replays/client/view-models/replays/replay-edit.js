Template.ReplayEdit.helpers({
  replay: function() {
    return Session.get('replay:current-instance');
  },
  submitEdit: function() {
    return function(e, id) {
      Rise.Helpers.Modal._defaultOnValidate(e, id);
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
