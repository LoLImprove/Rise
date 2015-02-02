Template.UserAuthForm.created = function() {
  Session.setDefault('user-auth:form:register', false);
  Session.setDefault('user-auth:form:general-errors', '');
};

Template.UserAuthForm.helpers({
  registration: function() {
    return Session.get('user-auth:form:register');
  },
  errors: function() {
    return Session.get('user-auth:form:general-errors');
  }
});

Template.UserAuthForm.events({
  'click .toggle-registration': function(e) {
    Session.set('user-auth:form:register', !Session.get('user-auth:form:register'));
  },
  'submit #user-auth-form': function(event) {
    event.preventDefault();
    var form = $(event.target);

    $('.modal-content').removeClass('shake animated');
    Session.set('user-auth:form:general-errors', ''); // Resets errors on submit

    // Only login, registration is handled by autoForm
    if (form.hasClass('login-form')) {
      var username = form.find('input[name="username"]');
      var password = form.find('input[name="password"]');
      Meteor.loginWithPassword(username.val(), password.val(), function(error) {
        if (error) {
          $('.modal-content').addClass('shake animated');
          Session.set('user-auth:form:general-errors', 'Incorrect email or password');
        } else {
          Rise.Helpers.Modal.dismiss();
          FlashMessages.sendSuccess("Successfuly logged in");
        }
      })

      return false;
    } else {
      return true;
    }
  }
});

AutoForm.addHooks('user-auth-form', {
  after: {
    'user-auth:register': function (error, loginData) {
      if (error) {
        Session.set('user-auth:form:general-errors', error.reason);
      } else {
        console.log('User created !');
        console.log('Logging in new user: ', loginData);
        // Seems unsafe, see user-auth/server/methods
        Meteor.loginWithPassword(loginData.email, loginData.password, function(e) {
          if (e) {
            console.log('Error logging in: ', e);
          } else {
            Rise.Helpers.Modal.dismiss();
            FlashMessages.sendSuccess("Successfuly logged in");
          }
        });
      }
      return false;
    }
  }
});
