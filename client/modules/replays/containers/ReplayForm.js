import ReplayForm from '../components/ReplayForm.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('REPLAY_FORM_ERROR');
  onData(null, {error});

  //return clearErrors;
};

export const depsMapper = (context, actions) => ({
  saveReplay: actions.replays.saveReplay,
  clearErrors: actions.replays.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ReplayForm);
