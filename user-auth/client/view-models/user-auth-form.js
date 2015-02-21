Template.UserAuthForm.created = function() {
  Session.set('user-auth:form:register', false);
  Session.set('user-auth:form:errors', '');
};

Template.UserAuthForm.helpers({
  registration: function() {
    return Session.get('user-auth:form:register');
  },
  errors: function() {
    return Session.get('user-auth:form:errors');
  }
});

Template.UserAuthForm.events({
  'click .toggle-registration': function(e) {
    // We reset the errors when switching from register to login and vice versa
    Session.set('user-auth:form:errors', '');
    Session.set('user-auth:form:register', !Session.get('user-auth:form:register'));
  },
  'submit #user-auth-form.login-form': function(event) {
    event.preventDefault();
    var form = $(event.target);

    $('.modal-content').removeClass('shake animated');
    Session.set('user-auth:form:errors', ''); // Resets errors on submit

    // Only login, registration is handled by autoForm
    if (form.hasClass('login-form')) {
      var username = form.find('input[name="username"]');
      var password = form.find('input[name="password"]');
      Meteor.loginWithPassword(username.val(), password.val(), function(error) {
        if (error) {
          $('.modal-content').addClass('shake animated');
          Session.set('user-auth:form:errors', 'Incorrect email or password');
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

AutoForm.hooks({
  'user-auth-form': {
    onSubmit: function(user) {
      console.info('Trying to create user with : ', user);

      Accounts.createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        profile: { level_of_play: user.level_of_play }
      }, function(error) {
        if (error) {
          // Bit of animation
          $('.modal-content').addClass('shake animated');
          console.error(error);
          Session.set('user-auth:form:errors', error.reason);
        } else {
          Rise.Helpers.Modal.dismiss();
          $('.modal-content').removeClass('shake animated');
          FlashMessages.sendSuccess("Successfuly logged in");
        }
      });

      return false;
    }
  }
});
