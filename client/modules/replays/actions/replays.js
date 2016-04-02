import _ from 'lodash';

export default {
  createReplay({Meteor, Flash, LocalState, Collections, FlowRouter}, form, callback) {
    const {Replay} = Collections;
		const {video_id, victory, champion, matchup, lane, kda, duration, patch, description, replay_file} = form;

    let replay = new Replay();
    /*
    replay.set({
      username: form.username,
      emails: [{ address: form.email }],
      profile : {
        level_of_play: form.level_of_play
      }
    });
     */
    if (!video_id.valid()) {
      LocalState.set('REPLAY_FORM_ERROR', 'Your youtube URL or video ID is invalid !');
      return ;
    }

    if (_.isEmpty(champion.value())) {
      return LocalState.set('REPLAY_FORM_ERROR', 'You need to provide a champion');
    }

    if (_.isEmpty(matchup.value())) {
      return LocalState.set('REPLAY_FORM_ERROR', 'You need to provide a matchup');
    }

    if (_.isEmpty(lane.value())) {
      return LocalState.set('REPLAY_FORM_ERROR', 'You need to provide a lane');
    }

    if (!kda.valid()) {
      return LocalState.set('REPLAY_FORM_ERROR', "Your KDA isn't right");
    }

    if (!duration.valid()) {
      return LocalState.set('REPLAY_FORM_ERROR', 'Your game duration is not valid');
    }

    if (!patch.valid()) {
      return LocalState.set('REPLAY_FORM_ERROR', 'The patch version you provided is not valid');
    }

    if (_.isEmpty(description.value())) {
      return LocalState.set('REPLAY_FORM_ERROR', 'You need to provide a description of your game and what seems to be the main pain points for you');
    }

    if (!replay_file.valid()) {
      return LocalState.set('REPLAY_FORM_ERROR', `The provided replay file is not valid. ${replay_file.error().message}`);
    }


    /*if (!user.validate()) {
      const error = _.values(user.getValidationErrors())[0];
      return LocalState.set('CREATE_USER_ERROR', error);
    }*/

    LocalState.set('REPLAY_FORM_ERROR', null);

    /*Accounts.createUser({
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
*/
    FlowRouter.go('/');
  },

  clearErrors({LocalState}) {
    // Not working for now, is called everytime a props change
    console.log('Cleanup');
    //return LocalState.set('REPLAY_FORM_ERROR', null);
  }
};
