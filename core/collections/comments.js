Rise.Comments = new Mongo.Collection('comments');

Rise.Comments.attachSchema(Rise.Schemas.Comments);//, {transform: true});
Rise.Comments.attachBehaviour('timestampable', Rise.Base.TimestampableOptions);

Rise.Comments.helpers({
  user: function() {
    return Meteor.users.findOne({ _id: this.user_id });
  },
  parent: function() {
    var type = this.parent_type;
    var analysisId = this.parent_id;

    return Rise.Analyses.findOne({ _id: analysisId })[type]; // TODO: Check
  }
});

// Only runs on the server otherwise it would be run twice on the client AND the server
// It could prove to be useful but it is not really needed and adds a lot of overhead
if (Meteor.isServer) {
  /*
   * After we insert a comment, we update the analysis record corresponding fields with
   * the comment id.
   *
     {
       _id: ObjectID(),
       ...
       general_note: {
         _id: ObjectID(),
         content: 'Some general note',
         comments_ids: [] <------ UPDATED
       },
       timeline_entries: [
         { ... },
         {
           _id: ObjectID(),
           time: "08:34",
           content: "Some timeline entry",
           comments_ids: [] <----- UPDATED
         },
         { ... }
       ]
   */
  Rise.Comments.after.insert(function(userId, comment) {
    var analysisId = comment.analysis_id,
        analysis   = Rise.Analyses.findOne(analysisId);
        parentType = comment.parent_type,
        parentId   = comment.parent_id,
        id         = this._id;

    if (parentType === 'general_note') {
      Rise.Analyses.update({ _id: analysisId }, { $addToSet: { 'general_note.comments_ids': id } });
    } else if (parentType === 'timeline_entry') {
      // Sugoi $elemMatch-sama
      Rise.Analyses.update(
        { _id: analysisId, timeline_entries: { $elemMatch: { _id: parentId } } },
        { $addToSet: { 'timeline_entries.$.comments_ids': id } }
      );
    }

    Notify("comment:insert", {
      link: Rise.Router.getPath('analysis-show', { _id: analysis.replay_id, analysis_id: analysis._id, anchor: 'comment-' + comment._id }),
      from: userId,
      to: analysis.user_id
    });

    Rise.Scoring.addPoints({ to: userId, for: "comment:insert" });
  });

} // if Meteor.isServer
