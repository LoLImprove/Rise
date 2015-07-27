Template.UserAuthForgotPasswordForm.hooks({
  rendered: function() {
    Rise.Modal.currentModal().find('.modal-title').text('Reset your password');
    Rise.Modal.currentModal().find('.btn-success').text('Reset');
  }
});

Template.UserAuthForgotPasswordForm.events({
  'submit #user-auth-forgot-password-form': function(e, template) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget),
        email = forgotPasswordForm.find('#forgot-password-email').val().toLowerCase();

    if (!_.isEmpty(email) && SimpleSchema.RegEx.Email.test(email)) {

      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            Session.set('user-auth:form:errors', 'This email does not exists.');
          } else {
            Session.set('user-auth:form:errors', 'Something went wrong, try again.');
          }
        } else {
          FlashMessages.sendSuccess("An email has been sent. Check your inbox.");
          Rise.Modal.dismiss();
        }
      });

    } else {
      Session.set('user-auth:form:errors', 'You need to provide an email.');
    }

    return false;
  },
});
