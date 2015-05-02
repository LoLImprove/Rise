/* ===== SCHEMA =====
{
  "id": 1,
  "avatar": "https://avatars0.githubusercontent.com/u/1383633?v=3&s=100",
  "email": "support@lolimprove.com",
  "password": "$2a$10$1V8eNHwClr3wcuPXwfE9G.x.e8yodjsuiJPVa9wtkJXbpwge12s32",
  "username": "Diacred",
  "league": "Gold V",
  "role": null,
  "life_points": 235,
  "verified": true,
  "last_request_at": "2014-11-19 10:34:02",
  "analyses_ids": [4, 5, 6],
  "replays_ids": [4],
  "created_at": "2014-11-12 18:55:18",
  "updated_at": "2014-11-19 10:34:02"
}
*/

Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.UserProfile = new SimpleSchema({
  level_of_play: { type: String },
  IGN: { type: String, optional: true },
  avatar: { type: String, optional: true }
});
Superseder.Schema.override(Rise.Schemas, 'UserProfile');

Rise.Schemas.VotedFor = new SimpleSchema({
  analyses_ids: { type: [String], defaultValue: [] },
  comments_ids: { type: [String], defaultValue: [] }
});

Rise.Schemas.Users = new SimpleSchema({
  username: { type: String, max: 20 },
  emails:   { type: [Object], minCount: 1, optional: true }, // WUT ? TODO: Remove optional but no can do
  "emails.$.address": { type: String, regEx: SimpleSchema.RegEx.Email },

  verified: { type: Boolean, defaultValue: false }, // TODO: Remove optional
  life_points: { type: Number, defaultValue: 0 },
  rank: { type: Number, defaultValue: 1 },

  replays_ids: { type: [String], defaultValue: [] },
  analyses_ids: { type: [String], defaultValue: [] },

  profile:  { type: Rise.Schemas.UserProfile },
  services: { type: Object, optional: true, blackbox: true },

  voted_for: { type: Rise.Schemas.VotedFor, defaultValue: { analyses_ids: [], comments_ids: []} },
  created_at: { type: Date, optional: true },
  updated_at: { type: Date, optional: true }, // TODO: Remove optional
  last_request_at: { type: Date, optional: true } // TODO: Remove optional
});
