/*
 Mainly:
 - Exports the {GeneralNotes} collection
 - Exports the {GeneralNote} model
 - Exports the {TimelineEntries} collection
 - Exports the {TimelineEntry} model
 - Exports the {Analyses} collection
 - Exports the {Analysis} model
 */

/* ===== SCHEMA =====
{
  "id": 1,
  "replay_id": 1,
  "user_id": 2,
  "votes": 15,
  "status": "pending",
  "general_note": {
    "content": "I am a general comment, hey !",
    "comments_ids": [...]
   }
  "timeline_entries": [
    { "time": '02:55', "content": 'bla1', comments_ids: [...] },
    { "time": '13:34', "content": 'bla2', comments_ids: [...] },
  ],
  "created_at": "2014-11-12 18:55:18",
  "updated_at": "2014-11-19 10:39:02"
}
*/

import {Mongo} from 'meteor/mongo';
import __ from 'lodash';
import {Replay} from './replays.js';
import {Comment} from './comments.js';

export const GeneralNotes = new Mongo.Collection('generalNotes');
export const GeneralNote = Astro.Class({
  name: 'GeneralNote',
  collection: GeneralNotes,
  fields: {
    analysis_id:  { type: 'string', validator: [Validators.required(), Validators.unique()] }, // We can only have one GeneralNote for an analysis
    comments_ids: { type: 'array',  nested: 'string', default: function() { return []; } },
    type:    { type: 'string', default: function() { return 'GeneralNote'; } },
    content: { type: 'string', validator: [Validators.required()] }
  },
  // --- Events ---
  events: {
    'afterRemove'(e) {
      this.comments().map(c => c.remove());
    }
  },
  methods: {
    excerpt() {
      return __.take(this.content.split(" "), 38).join(" ") + "...";
    },
    analysis() {
      return Analysis.findOne({ _id: this.analysis_id });
    },
    comments() {
      return Comment.find({ parent_id: this._id, parent_type: this.type });
    }
  }
});

export const TimelineEntries = new Mongo.Collection('timelineEntries');
export const TimelineEntry = Astro.Class({
  name: 'TimelineEntry',
  collection: TimelineEntries,
  fields: {
    analysis_id:  { type: 'string', validator: [Validators.required()] },
    comments_ids: { type: 'array',  nested: 'string', default: function() { return []; } },
    content:      { type: 'string', validator: [Validators.required()] },
    type: { type: 'string', default: function() { return 'TimelineEntry'; } },
    time: { type: 'string', validator: [Validators.required(), Validators.regexp(/^\d{1,2}:\d{1,2}$/)], default: function() { return '00:00'; } }
  },
  // --- Events ---
  events: {
    'afterRemove'(e) {
      this.comments().map(c => c.remove());
    }
  },
  methods: {
    analysis() {
      return  Analysis.findOne({ _id: this.analysis_id });
    },
    comments() {
      return Comment.find({ parent_id: this._id, parent_type: this.type });
    }
  }
});

export const Analyses = new Mongo.Collection('analyses');
export const Analysis = Astro.Class({
  name: 'Analysis',
  collection: Analyses,

  // --- Schema ---
  fields: {
    // fields
    user_id:   { type: 'string', validator: [Validators.required()] },
    replay_id: { type: 'string', validator: [Validators.required()] },

    votes: { type: 'number', default: () => { return 0; } },
    status: { type: 'string', default: () => { return "pending"; } }, // [pending, published]

    // general_note: { type: 'object', nested: 'GeneralNote', default: function() { return {}; } },
    // general_note: { type: Rise.Schemas.GeneralNote },
    // timeline_entries: { type: [Rise.Schemas.TimelineEntry] },

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
      var replay = this.replay();

      // Create the general note
      var generalNote = new GeneralNote();
      generalNote.set({
        analysis_id: this._id,
        content: "Your comment here"
      });

      if (generalNote.validate()) {
        generalNote.save();
      } else {
        throw new Meteor.Error("AnalysisInvalid", "General Note Invalid");
      }

      replay.push('analyses_ids', this._id);
      replay.save();

      // Push the new analysis in the user's list
      Meteor.users.update({ _id: this.user_id }, { $addToSet: { analyses_ids: this._id } });

       /*
      Notify("analysis:insert", {
        link: Rise.Router.getPath('analysis-show', { _id: analysis.replay_id, analysis_id: analysis._id }),
        from: userId,
        to: Rise.Replays.findOne(analysis.replay_id).user_id
      });

      Rise.Scoring.addPoints({ to: userId, for: "analysis:insert" });*/
    },
    'afterRemove'(e) {
      var replay = this.replay();

      // Updates the replay's analyses list
      replay.pull('analyses_ids', this._id);
      replay.save();

      // Updates the user's analyses list
      Meteor.users.update({ _id: this.user_id }, { $pull: { analyses_ids: this._id } });

      // Destroy general notes and timeline entries
      this.generalNote().remove();
      this.timelineEntries().map(t => t.remove());
    }
  },
  // --- Methods ---
  methods: {
    user() {
      return Meteor.users.findOne({ _id: this.user_id });
    },
    replay() {
      return Replay.findOne({ _id: this.replay_id });
    },
    generalNote() {
      return GeneralNote.findOne({ analysis_id: this._id });
    },
    timelineEntries() {
      return TimelineEntry.find({ analysis_id: this._id });
    }
  }
});

