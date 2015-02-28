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
    onSuccess: function(operation, id, template) {
      Router.go('replay', { _id: id });
    },
    onError: function(operation, error, template) {
      console.error('Trying to create a new replay but there was an error on ' + operation + ':', error);
    },
  }
});
