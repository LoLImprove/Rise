Meteor.methods({
  'rise:edit-comment': function(commentId, newValue) {
    Rise.Comments.update({ _id: commentId }, { $set: { content: newValue } });
  },
  'rise:submit-analysis-edit': function(a, b) {
    console.log(a, b, this);
  }
});
