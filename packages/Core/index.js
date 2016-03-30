import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
import _components from './components/index.js';
import _libs from './lib/index.js';

checkNpmVersions({
  'react': '0.14.x',
  'react-dom': '0.14.x',
  "react-bootstrap": "^0.28.3",
  "react-autosuggest": "3.6.0"
});

export default {
  Libs: _libs,
  Components: _components
};
