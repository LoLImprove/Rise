import AuthModal from '../components/AuthModal.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, resetModal}, onData) => {
  const {LocalState} = context();
  const showModal = LocalState.get('SHOW_AUTH');

  onData(null, {showModal});

  return resetModal;
};

export const depsMapper = (context, actions) => ({
  hideModal: () => context.LocalState.set('SHOW_AUTH', null),
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AuthModal);
