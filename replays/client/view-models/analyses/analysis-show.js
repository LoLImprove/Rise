Template.AnalysisShow.helpers({
  user: function() {
    console.log(this);
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  }
});
