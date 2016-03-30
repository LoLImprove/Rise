import {Users as _users, User as _user} from './models/users';
import {Replays as _replays, Replay as _replay} from './models/replays';

const ENV = Meteor.settings.public.env;

if (Meteor.isClient && ENV.development) {
  window.Users = _users;
  window.User = _user;
  window.Replays = _replays;
  window.Replay = _replay;

}

export const Users = _users;
export const User = _user;

export const Replays = _replays;
export const Replay = _replay;

