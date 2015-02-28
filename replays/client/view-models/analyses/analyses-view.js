// Context is the replay, i.e: Rise.UI.get('_id') gets the id of the replay
Template.AnalysesView.helpers({
  analyses: function() {
    return Rise.Analyses.find({ replay_id: Rise.UI.get('_id') });
  },
  user: function() {
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  },
  isAnalyzing: function() {
    if (Meteor.userId()) {
      return Session.get('replay:is-analyzing');
    } else {
      return false;
    }
  },
  currentUserAnalysis: function() {
    return Rise.Analyses.findOne({ replay_id: Rise.UI.get('_id'), user_id: Meteor.userId() });
  }
});
