Template.UserAuthResetPasswordModal.helpers({
  onCancel: function() {
    Session.get('rise:resetPasswordToken', null);
  },
  submitForm: function() {
    return function(e, id) {
      Rise.Modal._defaultOnValidate(e, id);
      return false; // We want validation first
    }
  }
});


Template.UserAuthResetPasswordModal.helpers({
  errors: function() {
    return Session.get('user-auth:form:errors');
  }
});

Template.UserAuthResetPasswordModal.events({
  'submit #user-auth-reset-password-form': function(e) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        password          = resetPasswordForm.find('#reset-password').val(),
        passwordConfirm   = resetPasswordForm.find('#reset-password-confirmation').val();

    if (!_.isEmpty(password)) {
      if (password === passwordConfirm) {
        Accounts.resetPassword(Session.get('rise:resetPasswordToken'), password, function(err) {
          if (err) {
            Session.set('user-auth:form:errors', 'Something went wrong, try again.');
          } else {
            FlashMessages.sendSuccess("Your password has been changed. Welcome back!");
            Session.set('rise:resetPasswordToken', null);
          }
        });
      } else {
        Session.set('user-auth:form:errors', 'Password confirmation mismatch.');
      }
    } else {
      Session.set('user-auth:form:errors', 'You need to provide a password.');
    }
    return false;
  }
});
