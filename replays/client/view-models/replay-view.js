Template.ReplayView.helpers({
  victory: function() {
    var victory = Rise.UI.get('victory');
    return victory ? 'victory' : 'defeat';
  },
  video_id: function() {
    return Rise.UI.get('video_id');
  },
  user: function() {
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  }
});

Template.ReplayView.events({
  'click .edit-replay': function(event) {
    event.preventDefault();
    Session.set('replay:edit-mode', true);
  }
});
