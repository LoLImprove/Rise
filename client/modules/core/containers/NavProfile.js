import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Auth from '../composers/auth.js';
import NavProfile from '../components/NavProfile.jsx';

export default composeAll(
  composeWithTracker(Auth),
  useDeps()
)(NavProfile);
