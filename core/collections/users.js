Meteor.users.helpers({
  replays: function() {
    return Rise.Replays.find({ _id: { $in: this.replays_ids } });
  },
  analyses: function() {
    return Rise.Analyses.find({ _id: { $in: this.analyses_ids } });
  }
});

Meteor.users.attachSchema(Rise.Schemas.Users);
Meteor.users.attachBehaviour('timestampable', Rise.Base.TimestampableOptions);
