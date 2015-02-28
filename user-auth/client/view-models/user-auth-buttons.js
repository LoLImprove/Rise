Template.UserAuthButtons.events = {
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
            $('#user-auth-form').submit();
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
  },

}
