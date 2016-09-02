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
import {Comment} from './comments.js';

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

    analyses_votes_ids: { type: 'array', nested: 'string', default: function() { return []; } },
    comments_votes_ids: { type: 'array', nested: 'string', default: function() { return []; } }

  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'created_at',
      hasUpdatedField: true,
      updatedFieldName: 'updated_at'
    }
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
    hasVotedFor(resourceType, resourceId) {
      var resourceKey = (resourceType === "analysis") ? "analyses_votes_ids" : "comments_votes_ids";
      return __.includes(this[resourceKey], resourceId);
    },
    toggleVoteFor(resourceType, resourceId) {
      var modelClass  = (resourceType === "analysis") ? Analysis : Comment;
      var resourceKey = (resourceType === "analysis") ? "analyses_votes_ids" : "comments_votes_ids";
      var hasVotedFor = this.hasVotedFor(resourceType, resourceId);
      var userVotedUpon = modelClass.findOne({_id: resourceId }).user_id;
      var updateQuery   = {};

      if (hasVotedFor) {
        updateQuery = { $pull: {} }
        updateQuery.$pull[resourceKey] = resourceId;
        modelClass.update({ _id: resourceId }, { $inc: { votes: -1 } });

        if (Meteor.isServer) {
          // USE HOOKS MAN IT WOULD BE SO COOL
          //Rise.Scoring.addPoints({ to: Meteor.userId(), for: "vote:down" });
          //Rise.Scoring.addPoints({ to: userVotedUpon, for: "voted:down" });
        }

      } else {
        updateQuery = { $push: {} }
        updateQuery.$push[resourceKey] = resourceId;
        modelClass.update({ _id: resourceId }, { $inc: { votes: 1 } });

        if (Meteor.isServer) {
          // USE HOOKS MAN IT WOULD BE SO COOL
          //Rise.Scoring.addPoints({ to: Meteor.userId(), for: "vote:up" });
          //Rise.Scoring.addPoints({ to: userVotedUpon, for: "voted:upon" });
        }

      }

      if (!__.isEmpty(updateQuery)) {
        Meteor.users.update({ _id: Meteor.userId() }, updateQuery);
      }
    },
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
