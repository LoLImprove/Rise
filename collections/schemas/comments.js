Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.Comment = new SimpleSchema({
  user_id: { type: String },
  parent_id: { type: String },
  parent_type: { type: String },

  content: { type: String },
  votes: { type: Number },
  reports: { type: Number },

  created_at:   { type: Date },
  updated_at:   { type: Date }
});
