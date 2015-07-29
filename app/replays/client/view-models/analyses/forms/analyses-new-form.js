AutoForm.hooks({
  'analysis-new-form': {
    formToDoc: function(doc) {
      doc.user_id = Meteor.userId();
      doc.replay_id = Session.get('replay:current-instance')._id;
      doc.status = "published"; // TODO: Change and create a real save system

      return doc;
    },
    onSuccess: function(operation, id) {
      Session.set('replay:is-analyzing', false);
      // TODO: Do something ? Animate maybe ?
    },
    onError: function(operation, error) {
      console.error('Trying to create a new analysis but there was an error on ' + operation + ':', error);
    },
  }
});
