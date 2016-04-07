import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Replays} from '/lib/collections';
import {Users} from '/lib/collections';

export default function () {

  Meteor.publish('replays:collection', function () {
    const selector = {};
    const options = {
      sort: {createdAt: -1},
      limit: 10
    };
    const response = Replays.find(selector, options);

    return response;
  });

  Meteor.publishComposite("replays:single", function(replayId) {
    check(replayId, String);
    const selector = { _id: replayId };

    return {
      find: function() {
        return Replays.find(selector);
      },
      // Replay's children
      children: [
        { // Replay's user
          find: function(replay) {
            return Users.find({ _id: replay.user_id }, { fields: { services: 0 }});
          }
        }
        // analyses
        /*,
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
        },*/
      ]
    };
  });
};
