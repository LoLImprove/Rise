Template.signInButtons.events = {
  'click .sign-in': function (event) {
    //debugger;
    Rise.Helpers.Modal(Template.signInForm, {
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
          label: "Danger!",
          className: "btn-warning",
          callback: function() {
            return true; // Close the modal
          }
        }
      }
    });
  },

}
