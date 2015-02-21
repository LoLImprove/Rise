Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.Comments = new SimpleSchema({
  user_id: { type: String },
  parent_id: { type: String },
  parent_type: { type: String },

  content: { type: String, autoform: {
      afFieldInput: {
        type: "textarea"
      }
    }
  },
  votes: { type: Number, defaultValue: 0 },
  reports: { type: Number, optional: true },

  created_at:   { type: Date },
  updated_at:   { type: Date }
});
