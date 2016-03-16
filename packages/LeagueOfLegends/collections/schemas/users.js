Superseder.Schema.registerOverride('UserProfile', new SimpleSchema({
  level_of_play: { type: String },
  IGN: { type: String, optional: true },
  avatar: { type: String, optional: true }
}));
