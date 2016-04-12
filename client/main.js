import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import usersModule from './modules/users';
import replaysModule from './modules/replays';
import analysesModule from './modules/analyses';
import commentsModule from './modules/comments';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(usersModule);
app.loadModule(replaysModule);
app.loadModule(analysesModule);
app.loadModule(commentsModule);
app.init();
