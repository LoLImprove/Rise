import _ from 'lodash';

export default {
  create({Meteor, Flash, LocalState, Collections, FlowRouter}, form, callback) {
    const {User} = Collections;

    let user = new User();
    user.set({
      username: form.username,
      emails: [{ address: form.email }],
      profile : {
        level_of_play: form.level_of_play
      }
    });

    if (!form.level_of_play) {
      return LocalState.set('CREATE_USER_ERROR', 'You need to specify your level of play (Bronze V, Gold II, ...)');
    }

    if (!form.username) {
      return LocalState.set('CREATE_USER_ERROR', 'You need to provide a username');
    }

    if (!form.email) {
      return LocalState.set('CREATE_USER_ERROR', 'You need to provide an email');
    }

    if (!user.validate()) {
      const error = _.values(user.getValidationErrors())[0];
      return LocalState.set('CREATE_USER_ERROR', error);
    }

    LocalState.set('CREATE_USER_ERROR', null);

    Accounts.createUser({
      username: user.username,
      email: user.email(),
      password: form.password,
      profile: { level_of_play: user.profile.level_of_play, IGN: '' }
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
