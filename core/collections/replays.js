Rise.Replays = new Mongo.Collection('replays');

Rise.Replays.attachSchema(Rise.Schemas.Replays);//, {transform: true});
Rise.Replays.attachBehaviour('timestampable', Rise.Base.TimestampableOptions);

Rise.Replays.helpers({
  user: function() {
    return Meteor.users.findOne({ _id: this.user_id });
  },
  analyses: function() {
    return Rise.Analyses.find({ _id: { $in: this.analyses_ids } });
  },
  title: function() {
    var metum = this.meta_information.general
    return metum.champion + " vs " + metum.matchup + " - " + metum.lane;
  },
  kda: function() {
    var metum = this.meta_information.specific
    return metum.kills + "/" + metum.deaths + "/" + metum.assists;
  }
});

/* ======== SCHEMA =======
{
  _id: "507f1f77bcf86cd799439011",
  user_id: "237cdf77bcf86cd799439012",
  video_id: "QMujSbIkF8M",
  meta_information: {
    general: {
      lane: "mid",
      champion: "syndra",
      matchup: "ahri"
    },
    specific: {
      kills: 9,
      deaths: 2,
      assists: 8
    }
  },
  victory: true,
  description: "I struggled a lot during the laning phase and didn't ward at all. When and where should I had warded ?",
  duration: "25:01",
  patch: "4.19",
  replay_file: null,
  analyses_ids: ["237cdf...", "508f2..."],
  created_at: "2014-11-12 16:35:18",
  updated_at: "2014-11-12 16:35:18"
}
*/