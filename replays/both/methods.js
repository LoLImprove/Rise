Meteor.methods({
  'rise:edit-comment': function(commentId, newValue) {
    Rise.Comments.update({ _id: commentId }, { $set: { content: newValue } });
  }
});
