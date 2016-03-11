import {Users as _users, User as _user} from './models/users';
const ENV = Meteor.settings.public.env;

if (Meteor.isClient && ENV.development) {
  window.Users = _users;
  window.User = _user;
}

export const Users = _users;
export const User = _user;
