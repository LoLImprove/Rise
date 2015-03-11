Rise.publish("rise:replays", function () {
  // TODO: Publish only the ones we need
  return Rise.Replays.find({});
});

// Publishes everything a replay's needs : the replay, it's analyses, analyses comments and  users related to the replay, an analysis or any comment
Rise.publishComposite("rise:replay", function(replayId) {
  return {
    find: function() {
      return Rise.Replays.find({ _id: replayId });
    },
    // Replay's children
    children: [
      // analyses
      {
        find: function(replay) {
          return Rise.Analyses.find({ replay_id: replay._id, status: 'published' });
        },
        // Analysis' children
        children: [
          { // Analysis' comments
            find: function(analysis, replay) {
              return Rise.Comments.find({ analysis_id: analysis._id });
            },
            children: [
              { // Comment's user
                find: function(comment, analysis, replay) {
                  return Meteor.users.find({ _id: comment.user_id }, { fields: { services: 0 }});
                }
              }
            ]
          },
          { // Analysis' user
            find: function(analysis, replay) {
              return Meteor.users.find({ _id: analysis.user_id }, { fields: { services: 0 }});
            }
          }
        ]
      },
      { // Replay's user
        find: function(replay) {
          return Meteor.users.find({ _id: replay.user_id }, { fields: { services: 0 }});
        }
      }
    ]
  };
});
