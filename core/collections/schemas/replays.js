Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.ReplaysGeneralMetum = new SimpleSchema({
  champion: { type: String, label: "Champion" },
  matchup:  { type: String, label: "Matchup" },
  lane:     { type: String, label: "Lane" }
});
Superseder.Schema.override(Rise.Schemas, 'ReplaysGeneralMetum');

Rise.Schemas.ReplaysSpecificMetum = new SimpleSchema({
  kda:   { type: String, label: "KDA" },
});
Superseder.Schema.override(Rise.Schemas, 'ReplaysSpecificMetum');

Rise.Schemas.ReplaysMetum = new SimpleSchema({
  general:  { type: Rise.Schemas.ReplaysGeneralMetum },
  specific: { type: Rise.Schemas.ReplaysSpecificMetum }
});

Rise.Schemas.Replays = new SimpleSchema({
  user_id:      { type: String },
  video_id:     { type: String, label: "Video ID" },
  analyses_ids: { type: [String], optional: true, defaultValue: [] },

  meta_information: { type: Rise.Schemas.ReplaysMetum },

  victory:      { type: Boolean, label: "Victory" },
  description:  {
    type: String,
    label: "Description",
    autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },
  duration:     { type: String, label: "Duration" },
  patch:        { type: String, label: "Patch", optional: true },
  replay_file:  { type: String, label: "Replay file",   optional: true, autoform: {
    afFieldInput: {
      type: "file"
    }
  }},
  created_at:   { type: Date },
  updated_at:   { type: Date }
});
