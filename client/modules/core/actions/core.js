import _ from 'lodash';

export default {
  showLogin({Flash, LocalState, FlowRouter}) {
    LocalState.set('SHOW_AUTH', true);
  }
}
