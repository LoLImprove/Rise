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
  comments: function() {
    return Rise.Comments.find({ analysis_id: this._id });
  }
});

// Only runs on the server otherwise it would be run twice on the client AND the server
// It could prove to be useful but it is not really needed and adds a lot of overhead
if (Meteor.isServer) {
  // After Analysis insert update the user's replay list and the analysis' replays list
  Rise.Analyses.after.insert(function(userId, analysis) {
    Meteor.users.update({ _id: analysis.user_id }, { $addToSet: { analyses_ids: analysis._id } });
    Rise.Replays.update({ _id: analysis.replay_id }, { $addToSet: { analyses_ids: analysis._id } });

    Notify("analysis:insert", {
      link: Rise.Router.getPath('analysis-show', { _id: analysis.replay_id, analysis_id: analysis._id }),
      from: userId,
      to: Rise.Replays.findOne(analysis.replay_id).user_id
    });

    Rise.Scoring.addPoints({ to: userId, for: "analysis:insert" });

  });

}
