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

Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.GeneralNote = new SimpleSchema({
  _id: { type: String, denyUpdate: true, autoValue: Rise.Schemas.ObjectID },
  type: { type: String, denyUpdate: true, defaultValue: 'general_note' },
  content: { type: String, autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },

  comments_ids: { type: [String], defaultValue: [], optional: true }
});

// TODO: Maybe protect the _id against updates
Rise.Schemas.TimelineEntry = new SimpleSchema({
  _id: { type: String, autoValue: Rise.Schemas.ObjectID },
  type: { type: String, defaultValue: 'timeline_entry' },
  time: { type: String, regEx: /^\d{1,2}:\d{1,2}$/, defaultValue: '00:00' },
  content: { type: String, autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },

  comments_ids: { type: [String], defaultValue: [], optional: true }
});

Rise.Schemas.Analyses = new SimpleSchema({
  user_id:   { type: String },
  replay_id: { type: String },

  votes: { type: Number, defaultValue: 0 },
  status: { type: String, defaultValue: "pending" }, // [pending, published]

  general_note: { type: Rise.Schemas.GeneralNote },
  timeline_entries: { type: [Rise.Schemas.TimelineEntry] },

  created_at:   { type: Date },
  updated_at:   { type: Date }
});

// TODO : Not working fix the validation msgs pls
Rise.Schemas.Analyses.messages({
  "regEx timeline_entries.$.time": [
    { msg: "[label] must be in digital form (mm/ss): 05:34 for instance" }
  ]
});
