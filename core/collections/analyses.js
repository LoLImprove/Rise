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

if (Meteor.isServer) {
  Rise.Analyses.after.insert(function(userId, analysis) {
    Meteor.users.update({ _id: analysis.user_id }, { $addToSet: { analyses_ids: analysis._id } });
    Rise.Replays.update({ _id: analysis.replay_id }, { $addToSet: { analyses_ids: analysis._id } });

    // Notify
    Notifications.new({
      title: 'has analyzed one of your replays',
      link: Rise.Router.getPath('analysis-show', { _id: analysis.replay_id, analysis_id: analysis._id }),
      owner: Rise.Replays.findOne(analysis.replay_id).user_id,
      data: {
        from: userId,
        replayId: analysis.replay_id
      },
      icon: 'comment-o',
      class: 'default',
    });

  });

}
