import {Comment} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function() {
  Meteor.methods({
    'comment:create'(data) {
      check(data, {
        parent_id: String,
        parent_type: String,
        content: String
      });

		  const {parent_id, parent_type, content} = data;

      let comment = new Comment();
      comment.set({
        user_id: this.userId,
        parent_id: parent_id,
        parent_type: parent_type,
        content: content
      });

      Security.can(this.userId).insert(comment).for(Comment.getCollection()).throw();

      if (comment.validate()) {
        comment.save();
      } else {
        throw new Meteor.Error("CommentError", comment.getValidationErrors());
      }

      return comment;
    },
    'comment:update'(data) {
      check(data, {
        comment_id: String,
        content: String
      });

		  const {comment_id, content} = data;

      let comment = Comment.findOne({ _id: comment_id });

      if (!comment || !content)  {
        throw new Meteor.Error("CommentError", "An error has occured whilst updating the comment");
      }

      Security.can(this.userId).update(comment_id).for(Comment.getCollection()).throw();

      comment.set({ content: content });

      if (comment.validate()) {
        comment.save();
      } else {
        throw new Meteor.Error("CommentError", comment.getValidationErrors());
      }

      return comment;
    },
    'comment:delete'(commentId) {
      check(commentId, String);

      const comment = Comment.findOne({ _id: commentId });

      Security.can(this.userId).remove(comment).for(Comment.getCollection()).throw();

      comment.remove((error, count) => {
        if (error) {
          throw new Meteor.Error("CommentError", {error, count});
        }
      });
    },
    'comment:toggleVote'(commentId) {
      check(commentId, String);

      currentUser = Meteor.users.findOne({ _id: this.userId });
      currentUser.toggleVoteFor("comment", commentId);
    }
  });
}
