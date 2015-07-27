Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.Comments = new SimpleSchema({
  user_id: { type: String },
  analysis_id: { type: String },
  parent_id: { type: String }, // parent_id is the id of a general note or timeline entry in an analysis.
  parent_type: { type: String },

  content: { type: String, autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },
  votes: { type: Number, defaultValue: 0 },
  reports: { type: Number, defaultValue: 0 },

  created_at:   { type: Date },
  updated_at:   { type: Date }
});
