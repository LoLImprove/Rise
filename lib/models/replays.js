/*
 Mainly:
 - Exports the {Replays} collection
 - Exports the {Replay} model
 */

/* {
  _id: "507f1f77bcf86cd799439011",
  user_id: "237cdf77bcf86cd799439012",
  video_id: "QMujSbIkF8M",
  meta_information: {
    lane: "mid",
    champion: "syndra",
    matchup: "ahri"
    kda: "5/4/3",
  },
  victory: true,
  description: "I struggled a lot during the laning phase and didn't ward at all. When and where should I had warded ?",
  duration: "25:01",
  patch: "4.19",
  replay_file: null,
  analyses_ids: ["237cdf...", "508f2..."],
  created_at: "2014-11-12 16:35:18",
  updated_at: "2014-11-12 16:35:18"
}
*/
import {Mongo} from 'meteor/mongo';
import __ from 'lodash';
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

export const ReplayMeta = Astro.Class({
  name: 'ReplayMeta',
  fields: {
    champion: { type: 'string', validator: [Validators.required()] },
    matchup:  { type: 'string', validator: [Validators.required()] },
    lane:     { type: 'string', validator: [Validators.required()] },
    kda:      { type: 'string', validator: [Validators.required(), Validators.regexp(/^(\d{1,3}\/){2}\d{1,3}/)] }
  }
});


const Collection = new Mongo.Collection('replays');
const Model = Astro.Class({
  name: 'Replay',
  collection: Collection,

  // --- Schema ---
  fields: {
    // fields
    user_id:      { type: 'string', validator: [Validators.required()] },
    video_id:     { type: 'string', validator: [Validators.required()] },
    analyses_ids: { type: 'array',  nested: 'string', default: function() { return []; } },

    meta_information: { type: 'object', nested: 'ReplayMeta', default: function() { return {}; } },

    victory:      { type: 'boolean', default: function() { return false; } },
    description:  { type: 'string', validator: [Validators.required()] },

    duration:     { type: 'string', validator: [Validators.required(), Validators.regexp(/^\d{1,2}:\d{1,2}/)] },
    patch:        { type: 'string' },
    replay_file:  { type: 'string' },

    behaviors: {
      timestamp: {
        hasCreatedField: true,
        createdFieldName: 'created_at',
        hasUpdatedField: true,
        updatedFieldName: 'updated_at'
      }
    }

  },
  // --- Events ---
  events: {
    'afterInsert'(e) {
      Meteor.users.update({ _id: this.user_id }, { $addToSet: { replays_ids: this._id } });
      // Rise.Scoring.addPoints({ to: uid, for: "replay:insert" });      
      
    },

    'afterRemove'(e) {
      Meteor.users.update({ _id: this.user_id }, { $pull: { replays_ids: this._id } });
      this.analyses().map(a => a.remove());
      // TODO: Remove replay_file from S3
    },
  },
  // --- Methods ---
  methods: {
    user() {
      return Meteor.users.findOne({ _id: this.user_id });
    },
    // Victory or Defeat
    outcome() {
      return this.victory ? 'Victory' : 'Defeat';
    },
    // first 50 words + ...
    excerpt() {
      return __.take(this.description.split(" "), 38).join(" ") + "...";
    },
    // All analysis except the one from the current user becaue we don't want it in the list it's handled separately
    analyses(fromCurrentUser = false) {
      if (fromCurrentUser || !Meteor.userId()) {
        return Analysis.find({ replay_id: this._id }, {  limit: 25 });
      } else {
        return Analysis.find({ replay_id: this._id, user_id: { $ne: Meteor.userId() } }, {  limit: 25 });
      }
    },
    userAnalysis(userId) {
      if (!userId) return ;

      return Analysis.findOne({ replay_id: this._id, user_id: userId });
    },
    result() {
      return this.victory ? 'Victory' : 'Loss';
    },
    title() {
      var metum = this.meta_information
      return metum.champion + " vs " + metum.matchup + " - " + metum.lane;
    },
    fileName() {
      if (this.replay_file) {
        return _.last(this.replay_file.split(/\//));
      } else {
        return this.replay_file;
      }
    }
  }
});

export const Replays = Collection;
export const Replay  = Model;
