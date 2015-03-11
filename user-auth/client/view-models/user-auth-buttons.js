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

  'click .sign-in': function (event) {
    //debugger;
    Rise.Modal.create(Template.UserAuthForm, {
      title: "Login",
      buttons: {
        save: {
          label: "Login",
          className: "btn-success",
          callback: function() {
            $('#user-auth-form, #user-auth-forgot-password-form, #user-auth-reset-password-form').submit();
            return false; // Do not close the modal
          }
        },
        cancel: {
          label: "Cancel",
          className: "btn-warning",
          callback: function() {
            Session.set('user-auth:form:errors', ''); // Resets errors when closing
            return true; // Close the modal
          }
        }
      }
    });
  }

});
