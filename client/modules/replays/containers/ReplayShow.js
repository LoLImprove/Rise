import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Auth from '/client/composers/Auth.jsx';
import ReplayShow from '../components/ReplayShow.jsx';

export const composer = ({context, replayId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('replays:single', replayId).ready()) {
    let replay = Collections.Replays.findOne(replayId);
    let replayUser = replay.user();
    let analyses = replay.analyses();
    let currentUserAnalysis = replay.userAnalysis(Meteor.userId());

    onData(null, {replay, replayUser, analyses, currentUserAnalysis });
  } else {
    let replay = Collections.Replays.findOne(replayId);
    let replayUser = replay && replay.user();
    let analyses = replay && replay.analyses();
    let currentUserAnalysis = replay && replay.userAnalysis(Meteor.userId());

    if (replay && replayUser) {
      onData(null, {replay, replayUser, analyses, currentUserAnalysis});
    } else {
      onData();
    }
  }
};

export const depsMapper = (context, actions) => ({
  showLogin: actions.core.showLogin,
  context: () => context
});

export default composeAll(
  composeWithTracker(Auth),
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ReplayShow);
