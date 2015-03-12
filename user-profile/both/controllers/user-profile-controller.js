Rise.Controllers = Rise.Controllers || {};

Rise.Controllers.UserProfileController = RouteController.extend({
  template: 'UserProfile',
  data: function () { return Meteor.users.findOne({ username: this.params.username }) },
  waitOn: function() {
    return Rise.subscribe('rise:user', this.params.username);
  },
  onBeforeAction: function() {
    if (this.data()) {
      this.next();
    } else {
      this.render('404');
    }
  },
  action : function () {
    // Waits for the data to be loaded
    if (this.ready()) {
      this.render();
    } else {
      console.log('not ready')
    }
  }
});
