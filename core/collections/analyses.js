Rise.Analyses = new Mongo.Collection('analyses');

Rise.Analyses.attachSchema(Rise.Schemas.Analyses);//, {transform: true});
Rise.Analyses.attachBehaviour('timestampable', Rise.Base.TimestampableOptions);

Rise.Analyses.helpers({
  user: function() {
    return Meteor.users.findOne({ _id: this.user_id });
  },
  replay: function() {
    return Rise.Replays.findOne({ _id: this.replay_id });
  },
   /* commentsFor("general_note") || commentsFor("timeline_entries") */
});
