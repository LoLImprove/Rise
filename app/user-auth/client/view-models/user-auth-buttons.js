Template.UserAuthButtons.hooks({
  created: function() {
    Session.set('rise:resetPasswordToken', Accounts._resetPasswordToken);
  }
});

Template.UserAuthButtons.helpers({
  showResetPassword: function() {
    return Session.get('rise:resetPasswordToken');
  }
});

Template.UserAuthButtons.events({
  'click .log-out': function (event) {
    event.preventDefault();
    Meteor.logout();
    FlashMessages.sendSuccess("Successfuly logged out");
  },
  'click .sign-in': Rise.UserAuth.displayLogin
});
