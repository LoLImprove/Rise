import React from 'react';
import _ from 'lodash';
import Core from 'meteor/rise:core';

import Comment from './Comment.jsx';

const Icon = Core.Components.Icon;
const Link = Core.Components.Link;
const Smartarea = Core.Components.Form.Smartarea;

const Comments = React.createClass({
    propTypes: {
        className: React.PropTypes.string.isRequired,
        parent: React.PropTypes.object.isRequired,
        comments: React.PropTypes.object.isRequired,
        showLogin: React.PropTypes.func.isRequired,
        toggleCommentVote: React.PropTypes.func.isRequired,
        deleteComment: React.PropTypes.func.isRequired,
        saveComment: React.PropTypes.func.isRequired,
        showLogin: React.PropTypes.func.isRequired,
        currentUser: React.PropTypes.any,
        goToInput: React.PropTypes.bool
    },

    componentDidMount() {
        if (this.props.goToInput) {
            this.goToInput();
        }
    },

    componentWillReceiveProps(props) {
        if (props.goToInput) {
            this.goToInput();
        }
    },

    goToInput() {
        
    },

    clearError() {
        const input = this.refs.newComment;
        input.clearError();
    },

    submitComment(e) {
        const input = this.refs.newComment;
        const isNotEmpty = !_.isEmpty(input.value());
        const lastComment = _.last(this.props.comments.fetch());
        const currentUser = this.props.currentUser;

        if (!currentUser) {
            this.props.showLogin();
        }

        if (isNotEmpty) {
            if (lastComment && lastComment.user()._id == currentUser._id) {
                return input.setError('You cannot comment twice in a row, edit your previous comment instead.');
            }

            const data = {
                parent_id: this.props.parent._id,
                parent_type: this.props.parent.type,
                content: input
            }

		        this.props.saveComment(data, { method: 'create' }, function(error, comment) {
                if (error) {
                    console.error(error, comment);
                } else {
                    input.clear();
                }
            });
        }
    },

    render() {
        const currentUser = this.props.currentUser;

        var form = (
            <li className="new-comment comment-input">
                <div className="picture-container">
                    <img className="user-picture" src={(currentUser && currentUser.profile.avatar) || "/images/misc/mockup/spazie1.jpg"} />
                </div>
                <div className="comment-area">
                    <Smartarea type="smartarea" minRows={1} ref="newComment" name="description" theme="blue" canSubmit={true} onSubmit={this.submitComment} onClick={currentUser ? this.clearError : this.props.showLogin} disabled={!currentUser} />
                </div>
            </li>
        );

        const comments = this.props.comments.map((comment, i) => {
            let isLastComment = _.eq(_.last(this.props.comments.fetch()), comment);

            return <Comment comment={comment}
                            currentUser={currentUser}
                            isLastComment={isLastComment}
                            toggleCommentVote={this.props.toggleCommentVote}
                            deleteComment={this.props.deleteComment}
                            saveComment={this.props.saveComment}
                            showLogin={this.props.showLogin}
                            key={i} />
        });

        console.log(this.props.className)
        return (
            <span>
                <ul className={`analysis-comments ${this.props.className}`}>
                    {comments}
                    {this.props.canPost ? form : ''}
                </ul>
            </span>
        );
    }
});

export default Comments;
