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
  avatar: { type: String, optional: true }
});

Rise.Schemas.UserMetum = new SimpleSchema({
  league: { type: String }
});

Rise.Schemas.Users = new SimpleSchema({
  username: { type: String, max: 20 },
  emails:   { type: [Object] },
  "emails.$.address": { type: String, regEx: SimpleSchema.RegEx.Email },

  meta_information: { type: Rise.Schemas.UserMetum },

  verified: { type: Boolean, optional: true }, // TODO: Remove optional
  life_points: { type: Number },

  replays_ids: { type: [String] },
  analyses_ids: { type: [String] },

  profile:  { type: Rise.Schemas.UserProfile, optional: true },
  services: { type: Object, optional: true, blackbox: true },

  created_at: { type: Date },
  updated_at: { type: Date, optional: true }, // TODO: Remove optional
  last_request_at: { type: Date, optional: true } // TODO: Remove optional
});
