import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Auth from '/client/composers/Auth.jsx';
import Comments from '../components/Comments.jsx';

export const depsMapper = (context, actions) => ({
  saveComment: actions.comments.saveComment,
  deleteComment: actions.comments.deleteComment,
  toggleCommentVote: actions.comments.toggleCommentVote,
  showLogin: actions.core.showLogin,
  context: () => context
});

export default composeAll(
  composeWithTracker(Auth),
  useDeps(depsMapper)
)(Comments);
