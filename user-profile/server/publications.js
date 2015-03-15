// Publishes everything a replay's needs : the replay, it's analyses, analyses comments and  users related to the replay, an analysis or any comment
Rise.publishComposite("rise:user", function(username) {
  return {
    find: function() {
      return Meteor.users.find({ username: username }, { fields: { services: 0 } });
    },
    // User's children
    children: [
      // analyses
      {
        find: function(user) {
          return Rise.Analyses.find({ _id: { $in: user.analyses_ids } }, { sort: { created_at: -1 }, limit: 6 });
        },

        children: [
          // replays
          {
            find: function(analysis) {
              return Rise.Replays.find({ _id: analysis.replay_id });
            }
          },
          // comments
          {
            find: function(analysis) {
              return Rise.Comments.find({ analysis_id: analysis._id });
            }
          }
        ]
      },
      { // replays
        find: function(user) {
          return Rise.Replays.find({ _id: { $in: user.replays_ids } }, { sort: { created_at: -1 }, limit: 6 });
        }
      }
    ]
  }
});
