import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export default ({context}, onData) => {
  const {Meteor} = context();

  Meteor.subscribe('users:current');
  const loggedIn = Meteor.userId() || false;
  const logout = Meteor.logout;
  const user = Meteor.users.findOne(Meteor.userId());
  onData(null, {loggedIn, user, logout});
};


