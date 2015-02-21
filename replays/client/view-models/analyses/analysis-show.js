Template.AnalysisShow.helpers({
  user: function() {
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  }
});
