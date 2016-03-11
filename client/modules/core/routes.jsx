import React from 'react';
import {mount} from 'react-mounter';

import Layout from './components/MainLayout.jsx';
import Home from './components/Home.jsx';
import NewUser from '../users/containers/NewUser.js';
import Login from '../users/containers/Login.js';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(Layout);

  FlowRouter.route('/', {
    name: 'items.list',
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

  FlowRouter.route('/login', {
    name: 'users.login',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Login />)
      });
    }
  }); 

  FlowRouter.route('/logout', {
    name: 'users.logout',
    action() {
      Meteor.logout();
      FlowRouter.go('/');
    }
  });  
}
