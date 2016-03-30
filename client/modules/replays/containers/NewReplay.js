import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Auth from '/client/composers/Auth.jsx';
import NewReplay from '../components/NewReplay.jsx';

export default composeAll(
  composeWithTracker(Auth),
  useDeps()
)(NewReplay);
