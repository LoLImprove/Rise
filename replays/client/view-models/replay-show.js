Template.ReplayShow.helpers({
  victory: function() {
    var victory = Rise.UI.get('victory');
    return victory ? 'victory' : 'defeat';
  },
  video_id: function() {
    return Rise.UI.get('video_id');
  },
  user: function() {
    return Rise.UI.get('user');
  }
});

Template.ReplayShow.helpers({
  'click .edit-replay': function(event) {
    event.preventDefault();
    Session.set('replay:edit-mode', true);
  }
});
