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
          return Rise.Analyses.find({ _id: { $in: user.analyses_ids } });
        }
      },
      { // replays
        find: function(user) {
          return Rise.Replays.find({ _id: { $in: user.replays_ids } });
        }
      }
    ]
  }
});
