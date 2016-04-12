/*
 Mainly:
 - Exports the {Comments} collection
 - Exports the {Comment} model
 */

/* ===== SCHEMA =====
*/

import {Mongo} from 'meteor/mongo';
import __ from 'lodash';
import {GeneralNote, TimelineEntry} from './analyses.js';

export const Comments = new Mongo.Collection('comments');
export const Comment = Astro.Class({
  name: 'Comment',
  collection: Comments,

  // --- Schema ---
  fields: {
    user_id:     { type: 'string', validator: [Validators.required()] },
    // parent_id is the id of a general note or timeline entry in an analysis.
    parent_id:   { type: 'string', validator: [Validators.required()] },
    // polymorphism
    parent_type:   { type: 'string', validator: [Validators.required(), Validators.choice(['GeneralNote', 'TimelineEntry'])] },

    content:   { type: 'string', validator: [Validators.required()] },
    votes: { type: 'number', default() { return 0; } },
    reports: { type: 'number', default() { return 0; } },

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
      var parent = this.parent();

      parent.push('comments_ids', this._id);
      parent.save();

      /*
       Notify("comment:insert", {
       link: Rise.Router.getPath('analysis-show', { _id: analysis.replay_id, analysis_id: analysis._id, anchor: 'comment-' + comment._id }),
       from: userId,
       to: analysis.user_id
       });
       */
      // Rise.Scoring.addPoints({ to: userId, for: "comment:insert" });
    },
    'afterRemove'(e) {
      var parent = this.parent();

      parent.pull('comments_ids', this._id);
      parent.save();
    }
  },
  // --- Methods ---
  methods: {
    user() {
      return Meteor.users.findOne({ _id: this.user_id });
    },
    parent() {
      var model;
      if (this.parent_type === "GeneralNote") {
        model = GeneralNote;
      } else if (this.parent_type === "TimelineEntry") {
        model = TimelineEntry;
      } else {
        return null;
      }

      return model.findOne({ _id: this.parent_id, type: this.parent_type });
    }
  }
});
