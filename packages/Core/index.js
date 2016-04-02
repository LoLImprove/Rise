import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
import _components from './components/index.js';
import _composers from './composers/index.js';
import _libs from './lib/index.js';

checkNpmVersions({
  'react': '0.14.x',
  'react-dom': '0.14.x',
  "react-bootstrap": "^0.28.3",
  "react-autosuggest": "3.6.0",
  "should": "^6.0.3",
  "tween-interpolate": "^1.0.1",
  "react-onclickoutside": "^4.7.1",
  "react-textarea-autosize": "^3.3.1",
  "raf": "^3.0.0"
});

Core = {
  Libs: _libs,
  Components: _components,
  Composers: _composers
};

export default Core;
