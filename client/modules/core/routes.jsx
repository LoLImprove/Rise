import React from 'react';
import {mount} from 'react-mounter';
import Progress from 'nprogress';

// Core
import Layout from './components/MainLayout.jsx';
import Home from './components/Home.jsx';

// Users
import NewUser from '../users/containers/NewUser.js';
import Login from '../users/containers/Login.js';

// Replays
import NewReplay from '../replays/containers/NewReplay.js';
import ReplayEdit from '../replays/containers/ReplayEdit.js';
import ReplayShow from '../replays/containers/ReplayShow.js';

const History = {
    _history: [],
    _rewound: false, // Indicates if we just called Router.back() and got back in history
    push: function(route, params) {
        let historyRoute = { route: route, params: params };
        if (this._rewound) {
            this._rewound = false;
        } else if ( !_.isEqual(_.last(this._history), historyRoute) ) {
            this._history.push(historyRoute);
        }
    },
    pop: function() {
        return this._history.pop();
    },
    back: function() {
        if (this._history.length > 1) {
            var previousState = this.previousState();
            FlowRouter.go(previousState.route, {}, previousState.params);

            this._rewound = true;
            return true;
        } else {
            console.debug("Router: can't go back further, already at initial state.");
            return null;
        }
    },
    previousState: function() {
        // Can't pop the initial state
        if (this._history.length > 1) {
            this.pop();
        }

        return _.last(this._history);
    }
}

export default function (injectDeps, {FlowRouter, Flash, LocalState}) {
    const MainLayoutCtx = injectDeps(Layout);

    FlowRouter.back = function() {
        History.back() || FlowRouter.go('/');
    }

    FlowRouter.triggers.enter(function(context) {
        // Handle fake progress bar
        Progress.start();
        Progress.inc(0.3);
        setTimeout(Progress.done, 1500);

        // Push route in history
        History.push(context.path, context.queryParams);
    });

    // When we leave a page we empty the Flash and hide the auth window 
    FlowRouter.triggers.exit(function(context) {
        // Handle fake progress bar
        Progress.inc(0.8);
        Progress.done();

        // Handle auth modal display
        LocalState.set('SHOW_AUTH', null);

        // Handle flash
        Flash.hasBeenSeen();
        Flash.clearSeen();
    });

    FlowRouter.route('/', {
        name: 'root',
        action() {
            mount(MainLayoutCtx, {
                content: () => (<Home />)
            });
        }
    });

    FlowRouter.route('/register', {
        name: 'users:new',
        action() {
            mount(MainLayoutCtx, {
                content: () => (<NewUser />)
            });
        }
    });

    FlowRouter.route('/new-replay', {
        name: 'replays:new',
        triggersEnter: [function(context, redirect) {
            if (!Meteor.userId()) {
                LocalState.set('SHOW_AUTH', true);
            }
            return;
        }],
        action() {
            mount(MainLayoutCtx, {
                content: () => (<NewReplay />)
            });
        }
    });

    FlowRouter.route('/replays/:replayId/edit', {
        name: 'replays:edit',
        triggersEnter: [function(context, redirect) {
            if (!Meteor.userId()) {
                LocalState.set('SHOW_AUTH', true);
            }
            return;
        }],
        action(params, queryParams) {
            mount(MainLayoutCtx, {
                content: () => (<ReplayEdit replayId={params.replayId} />)
            });
        }
    });

    FlowRouter.route('/replays/:replayId', {
        name: 'replays:show',
        action(params, queryParams) {
            mount(MainLayoutCtx, {
                content: () => (<ReplayShow replayId={params.replayId} />)
            });
        }
    });

}
