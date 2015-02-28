Template.Comments.helpers({
  comments: function() {
    return Rise.Comments.find({ _id: { $in: this.comments_ids } })
  }
});
