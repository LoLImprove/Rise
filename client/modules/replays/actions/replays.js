import _ from 'lodash';



export default {
  saveReplay({Meteor, Flash, LocalState, Collections, FlowRouter}, form, { method, replay }, callback) {
		const {video_id, victory, champion, matchup, lane, kda, duration, patch, description, replay_file} = form;
    
    // This method is called at the end either when a file has been uploaded or when no file was given
    // It is just the remaining of the method that might be called only after an upload
    // The function flow here is weird to read so bare with it and I am sorry about it
    const done = (error, replay_url) => {
      LocalState.set('REPLAY_FORM_ERROR', null);

      // Here we assume everything is valid
      let data = {
        replay_id, // null if create
        video_id: video_id.value(),
        victory: victory.value(),
        champion: champion.value(),
        matchup: matchup.value(),
        lane: lane.value(),
        kda: kda.value(),
        duration: duration.value(),
        patch: patch.value(),
        description: description.value(),
        replay_file: replay_url
      };

      Meteor.call(`replay:${method}`, data, (error, replay) => {
        if (error) {
          return LocalState.set('REPLAY_FORM_ERROR', error.message);
        } else {
          console.log('replays', replay);
          FlowRouter.go('replays:show', { replayId: replay._id });
        }
      });
    };

    if (!video_id.valid()) {
      return LocalState.set('REPLAY_FORM_ERROR', 'Your youtube URL or video ID is invalid !');
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

    if (replay_file.valid()) {

      if (replay_file.input().files.length > 0) {
        return replay_file.component().upload({ done });
      } else {
        // If no file provided we just don't upload and go straight to the creation
        done(null, null);
      }

    } else {
      return LocalState.set('REPLAY_FORM_ERROR', `The provided replay file is not valid. ${replay_file.error().message}`);      
    }

  },

  clearErrors({LocalState}) {
    return LocalState.set('REPLAY_FORM_ERROR', null);
  }
};
