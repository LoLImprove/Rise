Template.signInForm.helpers({

});

AutoForm.addHooks('user-auth-form', {
  after: {
    'user-auth:register': function (_, loginData) {
      // Seems unsafe, see user-auth/server/methods
      Meteor.loginWithPassword(loginData.email, loginData.password, function(e) {
        console.log(e);
      })
      return false;
    }
  }
});

Template.signInForm.events = {
/*  'submit #user-auth-form': function(event) {
    event.preventDefault();

    var form = $(event.target);

    var isValid = Rise.Helpers.validateForm(form, {
      'password': {
        validation: function(field) {
          var password = field.value;
          return !_.isEmpty(password);
        },
        message: "Password can't be blank"
      },
      'password-confirmation': {
        validation: function() {
          var passwords = form.find('input[type="password"]');
          return !_.isEmpty(passwords[0].value) && (passwords[0].value == passwords[1].value)
        },
        message: 'Password and password confirmation must match'
      },
      'emails.0.address': {
        validation: function(field) {
          var email = field.value;
          return !_.isEmpty(email); // TODO: Improve
        },
        message: 'Address must be a valid e-mail address'
      }
    });

    return isValid;
  }*/
};
