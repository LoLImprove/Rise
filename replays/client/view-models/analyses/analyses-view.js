Template.AnalysesView.hooks({});

// Context the replay
Template.AnalysesView.helpers({
  analyses: function() {
    return Rise.Analyses.find({ replay_id: Rise.UI.get('_id') });
  },
  user: function() {
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  }
});
