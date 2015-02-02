Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.ReplaysGeneralMetum = new SimpleSchema({
  champion: { type: String, label: "Champion" },
  matchup:  { type: String, label: "Matchup" },
  lane:     { type: String, label: "Lane" }
});

Rise.Schemas.ReplaysSpecificMetum = new SimpleSchema({
  kills:   { type: Number, label: "Kills" },
  deaths:  { type: Number, label: "Deaths" },
  assists: { type: Number, label: "Assists" }
});

Rise.Schemas.ReplaysMetum = new SimpleSchema({
  general:  { type: Rise.Schemas.ReplaysGeneralMetum },
  specific: { type: Rise.Schemas.ReplaysSpecificMetum }
});

Rise.Schemas.Replays = new SimpleSchema({
  user_id:      { type: String },
  video_id:     { type: String, label: "Video ID" },
  analyses_ids: { type: [String], optional: true },

  meta_information: { type: Rise.Schemas.ReplaysMetum },

  victory:      { type: Boolean, label: "Victory" },
  description:  { type: String, label: "Description" },
  duration:     { type: String, label: "Duration" },
  patch:        { type: String, label: "Patch", optional: true },
  replay_file:  { type: String, label: "Replay file",   optional: true },
  created_at:   { type: Date },
  updated_at:   { type: Date }
});
