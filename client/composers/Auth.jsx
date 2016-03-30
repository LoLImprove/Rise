import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import Forbidden from '../modules/core/components/Forbidden.jsx';

export const Auth = {
    helpers: {
        render({ user, loggedIn }, component) {
            if (loggedIn) {
                return component({ user });
            } else {
                return (<Forbidden message="You need to be logged in." />);
            }
        }
    }
}

export default ({context}, onData) => {
    const {Meteor} = context();

    Meteor.subscribe('users:current');
    const loggedIn = Meteor.userId() || false;
    const logout = Meteor.logout;
    const user = Meteor.users.findOne(Meteor.userId());

    onData(null, {loggedIn, user, logout});
};
