import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import * as Collections from '/lib/collections';

export default function () {
  /*
   Meteor.publish('analyses:collection', function () {
   const selector = {};
   const options = {
   sort: {createdAt: -1},
   limit: 10
   };
   const response = Collections.Analyses.find(selector, options);

   return response;
   });
   */

  Meteor.publishComposite("analyses:single", function(analysisId) {
    check(analysis, String);
    const selector = { _id: analysisId };

    return {
      find: function() {
        return Collections.Analyses.find(selector);
      },
      children: [
        { // Analysis' user
          find: function(analysis, replay) {
            return Meteor.users.find({ _id: analysis.user_id }, { fields: { services: 0 }});
          }
        },
        { // Analysis' General Note
          find: function(analysis, replay) {
            return Collections.GeneralNotes.find({ analysis_id: analysis._id }, { limit: 1 });
          },
          children: [
            { // General Note's comments
              find: function(generalNote, analysis, replay) {
                return Collections.Comments.find({ parent_id: generalNote._id, parent_type: generalNote.type });
              },
              children: [
                { // Comment's user
                  find: function(comment, generalNote, analysis, replay) {
                    return Meteor.users.find({ _id: comment.user_id }, { fields: { services: 0 }});
                  }
                }
              ]
            }
          ]
        },
        { // Analysis' Timeline Entries
          find: function(analysis, replay) {
            return Collections.TimelineEntries.find({ analysis_id: analysis._id });
          },
          children: [
            { // Timeline Entries' comments
              find: function(timelineEntry, analysis, replay) {
                return Collections.Comments.find({ parent_id: timelineEntry._id, parent_type: timelineEntry.type });
              },
              children: [
                { // Comment's user
                  find: function(comment, timelineEntry, analysis, replay) {
                    return Meteor.users.find({ _id: comment.user_id }, { fields: { services: 0 }});
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  });
};
