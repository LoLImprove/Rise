import React from 'react';
import {mount} from 'react-mounter';

import Layout from './components/MainLayout.jsx';
import Home from './components/Home.jsx';
import NewUser from '../users/containers/NewUser.js';
import Login from '../users/containers/Login.js';

export default function (injectDeps, {FlowRouter, Flash}) {
    const MainLayoutCtx = injectDeps(Layout);

    // When we leave a page we empty the Flash
    FlowRouter.triggers.exit(function(context) {
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
        name: 'users.new',
        action() {
            mount(MainLayoutCtx, {
                content: () => (<NewUser />)
            });
        }
    });
}
