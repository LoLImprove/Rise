/*
   Mainly:
   - Exports the {Users} collection
   - Exports the {User} model
*/

import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import __ from 'lodash';
import {Replay} from './replays.js';
import {Analysis} from './analyses.js';

export const Email = Astro.Class({
  name: 'Email',
  fields: {
    address: {
      type: 'string',
      validator: [ Validators.required(), Validators.string(), Validators.email() ]
    }
  }
});

export const UserProfile = Astro.Class({
  name: 'UserProfile',
  fields: {
    level_of_play: { type: 'string', validator: [Validators.required(), Validators.string()] },
    IGN: 'string',
    avatar: 'string'
  }
});

const Model = Astro.Class({
  name: 'User',
  collection: Meteor.users,

  // --- Schema ---
  fields: {
    // fields
    username:    { type: 'string', validator: [Validators.required(), Validators.maxLength(30)] },
    emails:      { type: 'array', nested: 'Email', validator: Validators.required() },
    life_points: { type: 'number', default: function() { return 0; } },
    rank:        { type: 'number', default: function() { return 1; } },
    profile:     { type: 'object', nested: 'UserProfile', default: function() { return {}; } },

    last_request_at: { type: 'date', default: function() { return new Date() } },

    // relations
    replays_ids: { type: 'array', nested: 'string', default: function() { return []; } },
    analyses_ids: { type: 'array', nested: 'string', default: function() { return []; } },

    behaviors: {
      timestamp: {
        hasCreatedField: true,
        createdFieldName: 'created_at',
        hasUpdatedField: true,
        updatedFieldName: 'updated_at'
      }
    },

  },
  // --- Events ---
  events: {
    'afterInsert'(e) {
      //Rise.Scoring.addPoints({ to: user._id, for: "user:registration" });
    },
    'afterRemove'(e) {
      this.replays().map(r => r.remove());
      this.analyses().remove(a => a.remove());
    }
  },
  // --- Methods ---
  methods : {
    replays() {
      return Replay.find({ user_id: this._id });
    },
    analyses() {
      return Analysis.find({ user_id: this._id });
    },
    email() {
      return __.get(this, 'emails[0].address', null);
    }
  }
});

if (Meteor.isServer) {
  Model.extend({
    fields: {
      services: 'object'
    }
  });
}

export const Users = Meteor.users;
export const User  = Model;
