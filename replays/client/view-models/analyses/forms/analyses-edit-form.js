AutoForm.hooks({
  'analysis-edit-form': {
    formToDoc: function(doc, ss, formId) {
//      doc.user_id = Meteor.userId();
/*    doc.replay_id = Session.get('replay:current-instance')._id;
      doc.status = "published"; // TODO: Change and create a real save system*/
      console.log(doc, ss, formId);
      return doc;
    },
    onSuccess: function(operation, id, template) {
      // TODO: Do something ? Animate maybe ?
    },
    onError: function(operation, error, template) {
      console.error('Trying to create a new analysis but there was an error on ' + operation + ':', error);
    },
  }
});