import React from 'react';
import _ from 'lodash';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Forbidden from '../modules/core/components/Forbidden.jsx';

export const Auth = {
    helpers: {
        render({ loggedIn, user, hasPermission }, component) {
            let hasPermissions = _.isUndefined(hasPermission) ? (() => (true)) : hasPermission;

            if (loggedIn && hasPermissions) {
                return component({ user });
            } else if (!loggedIn) {
                return (<Forbidden message="You need to be logged in." />);
            } else {
                return (<Forbidden message="You do not have the rights to access this page." />);
            }
        },
        isOwnerOf(resource, user, component) {
            if (!resource || !user || !component) return '';

            if (resource.user_id === user._id) {
                return component;
            }
        }

    }
}

export const PermissionsComposer = function(subscription, arg, { ready, fromCache }) {
    const hasPermissions = (function(user, resource) {
        if (user && user._id && resource && (resource.userId || resource.user_id)) {
            let userId = resource.userId || resource.user_id;
            if (user._id === userId) {
                return true;
            }
        } 
        return false;
    });

    const permissionsFor = _.curry(hasPermissions);

    if (Meteor.subscribe(subscription, arg).ready() && Meteor.subscribe('users:current').ready()) {
        let user = Meteor.users.findOne(Meteor.userId());
        let hasPermissionsFor = permissionsFor(user);
        ready({ user, hasPermissionsFor });
    } else {
        let user = Meteor.users.findOne(Meteor.userId());
        let hasPermissionsFor = permissionsFor(user);
        fromCache({ user, hasPermissionsFor });
    }
};


export default ({context}, onData) => {
    const {Meteor, Collections} = context();

    Meteor.subscribe('users:current');
    const loggedIn = Meteor.userId() || false;
    const logout = Meteor.logout;
    const user = Collections.User.findOne(Meteor.userId());

    onData(null, {loggedIn, user, logout});
};
