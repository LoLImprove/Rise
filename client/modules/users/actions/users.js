export default {
  create({Meteor, LocalState, FlowRouter}, email, password) {
    if (!email) {
      return LocalState.set('CREATE_USER_ERROR', 'Email is required.');
    }

    if (!password) {
      return LocalState.set('CREATE_USER_ERROR', 'Password is required.');
    }

    LocalState.set('CREATE_USER_ERROR', null);

    Accounts.createUser({email, password}, function(e) {
      console.log(e);
    });

    FlowRouter.go('/');
  },

  login({Meteor, Flash, LocalState, FlowRouter}, email, password, callback) {
    debugger;
    if (!email) {
      return LocalState.set('LOGIN_ERROR', 'You need to provide an email');
    }

    if (!password) {
      return LocalState.set('LOGIN_ERROR', 'You need to provide a password');
    }

    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        callback(error);
        LocalState.set('LOGIN_ERROR', "The provided email and password do not match");
      } else {
        console.log('redirection', Flash);
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }
};
