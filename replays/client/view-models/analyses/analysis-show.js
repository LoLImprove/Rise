Template.AnalysisShow.hooks({
  created: function() {
    Session.set('replay:edit-current-analysis', false);
  }
});
Template.AnalysisShow.events({
  'click .edit-analysis': function() {
    Session.set('replay:edit-current-analysis', true);
  }
});

// Context must be analysis, ofc
Template.AnalysisShow.helpers({
  user: function() {
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  },
  isEditing: function() {
    if (Meteor.userId() && (Rise.UI.get('user_id') === Meteor.userId())) {
      return Session.get('replay:edit-current-analysis');
    } else {
      return false;
    }
  }
});
