import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Auth from '/client/composers/Auth.jsx';
import NavProfile from '../components/NavProfile.jsx';

export default composeAll(
  composeWithTracker(Auth),
  useDeps()
)(NavProfile);
