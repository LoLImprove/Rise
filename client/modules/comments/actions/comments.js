import _ from 'lodash';

export default {
  toggleCommentVote({Meteor, Flash, LocalState, Collections, FlowRouter}, commentId, callback) {
    Meteor.call('comment:toggleVote', commentId, (error) => {
      if (error) {
        callback(error);
      }
    });
  },
  deleteComment({Meteor, Flash, LocalState, Collections, FlowRouter}, commentId, callback) {
    Meteor.call('comment:delete', commentId, (error) => {
      if (error) {
        callback(error);
      }
    });
  },
  saveComment({Meteor, Flash, LocalState, Collections, FlowRouter}, form, { method, comment_id }, callback) {
		const {parent_id, parent_type, content} = form;

    // Here we assume everything is valid
    if (comment_id) {
      var data = {
        comment_id: comment_id,
        content: content.value()
      };
    } else {
      var data = {
        parent_id: parent_id,
        parent_type: parent_type,
        content: content.value()
      };
    }

    Meteor.call(`comment:${method}`, data, (error, comment) => {
      callback(error, comment);
      if (error) {
        console.error(error);
      }
    });
  }
}
