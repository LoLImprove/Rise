export default {
  create({Meteor, Flash, LocalState, Collections, FlowRouter}, email, password, callback) {
    const {User} = Collections;

    let user = new User();
    user.set({
      username: email,
      emails: [{ address: email }],
      profile : {
        IGN: 'Diacred',
        level_of_play: 'Gold V'
      }
    });
    debugger;
    if (!email) {
      return LocalState.set('CREATE_USER_ERROR', 'You need to provide an email');
    }

    if (!password) {
      return LocalState.set('CREATE_USER_ERROR', 'You need to provide a password.');
    }

    LocalState.set('CREATE_USER_ERROR', null);

    Accounts.createUser({
      username: user.username,
      email: user.email(),
      password: password,
      profile: { level_of_play: user.profile.level_of_play, IGN: user.profile.IGN }
    }, function(error) {
      if (error) {
        callback(error);
        console.log(error);
        LocalState.set('CREATE_USER_ERROR', error.reason);
      } else {
        Flash.flash('Your account has been created successfully !', 'success');
      }
    });

    FlowRouter.go('/');
  },

  login({Meteor, Flash, LocalState, FlowRouter}, email, password, callback) {
    if (!email) {
      return LocalState.set('LOGIN_ERROR', 'You need to provide an username or an email');
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
        Flash.flash('You have been logged in.', 'success');
      }
    });
  },

  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }
};
