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
  content: { type: String },
  comments_ids: { type: [Number] }
});

Rise.Schemas.TimelineEntry = new SimpleSchema({
  content: { type: String },
  time: { type: String },
  comments_ids: { type: [Number] }
});

Rise.Schemas.Analyses = new SimpleSchema({
  user_id:   { type: String },
  replay_id: { type: String },

  votes: { type: Number },
  status: { type: String }, // [Pending, Published]

  general_note: { type: Rise.Schemas.GeneralNote },
  timeline_entries: { type: [Rise.Schemas.TimelineEntry] },

  created_at:   { type: Date },
  updated_at:   { type: Date }
});
