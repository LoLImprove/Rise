Rise.UserAuth = {};
Rise.UserAuth.displayLogin = (function (event) {
  //debugger;
  if (!Meteor.userId()) {
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
