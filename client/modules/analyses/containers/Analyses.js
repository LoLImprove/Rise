import _ from 'lodash';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Core from 'meteor/rise:core';
import Auth from '/client/composers/Auth.jsx';
import Analyses from "../components/Analyses.jsx";

export const composer = ({ context, replayId, replay, analyses, currentUserAnalysis }, onData) => {
  const {Meteor, Collections} = context();

  // Might be used from outside a ReplayShow
  if (!replay || !analyses) {
    Core.Libs.Subscriber.subscribeOnce('replays:single', replayId);

    let replay = Collections.Replays.findOne(replayId);
    let analyses = replay.analyses();
    let currentUserAnalysis = replay.userAnalysis(Meteor.userId());

    if (analyses && replay) {
      onData(null, {replay, analyses, currentUserAnalysis });
    } else {
      onData();
    }

  } else {
    onData(null, { replay, analyses, currentUserAnalysis });
  }

};

export const depsMapper = (context, actions) => ({
  showLogin: actions.core.showLogin,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Analyses);
