import {Users as _users, User as _user} from './models/users';
import {Replays as _replays, Replay as _replay} from './models/replays';
import {Analyses as _analyses, Analysis as _analysis, GeneralNotes as _general_notes, GeneralNotes as _general_note, TimelineEntries as _timeline_entries, TimelineEntry as _timeline_entry} from './models/analyses';
import {Comments as _comments, Comment as _comment} from './models/comments';

const ENV = Meteor.settings.public.env;

if (Meteor.isClient && ENV.development) {
  window.Users = _users;
  window.User = _user;
  window.Replays = _replays;
  window.Replay = _replay;
  window.Analyses = _analyses;
  window.Analysis = _analysis;
  window.GeneralNotes = _general_notes;
  window.GeneralNote = _general_note;
  window.TimelineEntries = _timeline_entries;
  window.TimelineEntry = _timeline_entry;
  window.Comments = _comments;
  window.Comment = _comment;
}

export const Users = _users;
export const User = _user;

export const Replays = _replays;
export const Replay = _replay;

export const Analyses = _analyses;
export const Analysis = _analysis;

export const GeneralNotes = _general_notes;
export const GeneralNote = _general_note;

export const TimelineEntries = _timeline_entries;
export const TimelineEntry = _timeline_entry;

export const Comments = _comments;
export const Comment = _comment;

