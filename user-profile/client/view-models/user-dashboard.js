Template.UserDashboard.helpers({
  commentsCountFor: function(record) {
    return record.comments().count();
  },
  permalinkData: function() {
    return { _id: Rise.UI.get('replay_id'), analysis_id: Rise.UI.get('_id') }
  }
});
