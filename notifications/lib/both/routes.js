Router.map(function() {
  this.route('notifications', {
    path: '/notifications',
    waitOn: function() {
      return [Meteor.subscribe('notifications')];
    }
  });
});
