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
        isLoggedIn(user, component) {
            if (user && user._id && user._id === Meteor.userId()) {
                return component;
            }
        },
        isNotLoggedIn(user, component) {
            if (!user || (user && !user._id) || (user && user._id !== Meteor.userId())) {
                return component;
            }
        },
        // If called with a component will return the component or undefined otherwise returns true or undefined
        isOwnerOf(resource, user, component) {
            if (!resource || !user) return '';

            if (resource.user_id === user._id) {
                if (component) {
                    return component;
                } else {
                    return true;
                }
            } 
        },
        // If called with a component will return the component or undefined otherwise returns true or undefined
        isNotOwnerOf(resource, user, component) {
            if (!resource || !user) return '';

            if (resource.user_id !== user._id) {
                if (component) {
                    return component;
                } else {
                    return true;
                }
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
        let currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
        let hasPermissionsFor = permissionsFor(currentUser);
        ready({ currentUser, hasPermissionsFor });
    } else {
        let currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
        let hasPermissionsFor = permissionsFor(currentUser);
        fromCache({ currentUser, hasPermissionsFor });
    }
};


export default ({context}, onData) => {
    const {Meteor, Collections} = context();

    Meteor.subscribe('users:current');
    const loggedIn = Meteor.userId() || false;
    const logout = Meteor.logout;
    const currentUser = Collections.User.findOne({ _id: Meteor.userId() });

    onData(null, {loggedIn, currentUser, logout});
};
