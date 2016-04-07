import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Auth, { PermissionsComposer } from '/client/composers/Auth.jsx';
import ReplayEdit from '../components/ReplayEdit.jsx';

export const composer = ({context , replayId}, onData) => {
  const {Meteor, Collections} = context();

  PermissionsComposer('replays:single', replayId, {
    ready: ({ user, hasPermissionsFor }) => {
      let replay = Collections.Replays.findOne(replayId);
      let replayUser = replay && replay.user();
      onData(null, {replay, replayUser, hasPermissionsFor});
    },
    fromCache: ({ user, hasPermissionsFor }) => {
      let replay = Collections.Replays.findOne(replayId);
      let replayUser = replay && replay.user()

      if (replay && replayUser && user) {
        onData(null, {replay, replayUser, hasPermissionsFor});
      } else {
        onData();
      }
    }
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(Auth),
  useDeps(depsMapper)
)(ReplayEdit);
