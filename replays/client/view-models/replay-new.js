Template.ReplayNew.created = function() {
  Session.setDefault('replay:new-instance', {});
}

Template.ReplayNew.helpers({
  newReplay: function() {
    return Session.get('replay:new-instance');
  }
});

Template.ReplayNew.events({
  'change input, keypress input, blur input': function() {
    Session.set('replay:new-instance', AutoForm.getFormValues('replay-new-form').insertDoc);
  }
});

AutoForm.hooks({
  'replay-new-form': {
    formToDoc: function(doc, ss, formId) {
      doc.user_id = Meteor.userId();
      return doc;
    }
  }
});
