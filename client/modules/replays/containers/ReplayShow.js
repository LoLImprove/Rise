import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Auth from '/client/composers/Auth.jsx';
import ReplayShow from '../components/ReplayShow.jsx';

export const composer = ({context, replayId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('replays:single', replayId).ready()) {
    let replay = Collections.Replays.findOne(replayId);
    let replayUser = replay && replay.user();

    onData(null, {replay, replayUser });
  } else {
    let replay = Collections.Replays.findOne(replayId);
    let replayUser = replay && replay.user()

    if (replay && replayUser) {
      onData(null, {replay, replayUser});
    } else {
      onData();
    }
  }
};

export const depsMapper = (context, actions) => ({
  //createReplay: actions.replays.createReplay,
  //  updateReplay: actions.replays.updateReplay,
  //clearErrors: actions.replays.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(Auth),
  useDeps(depsMapper)
)(ReplayShow);
