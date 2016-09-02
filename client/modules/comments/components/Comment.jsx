import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';

import Core from 'meteor/rise:core';

import { Auth } from '/client/composers/Auth.jsx';

const Icon = Core.Components.Icon;
const Smartarea = Core.Components.Form.Smartarea;

const Comments = React.createClass({
    propTypes: {
        comment: React.PropTypes.object.isRequired,
        isLastComment: React.PropTypes.bool.isRequired,
        saveComment: React.PropTypes.func.isRequired,
        deleteComment: React.PropTypes.func.isRequired,
        toggleCommentVote: React.PropTypes.func.isRequired,
        showLogin: React.PropTypes.func.isRequired,
        currentUser: React.PropTypes.any
    },

    getInitialState() {
        return {
            isEditing: false
        };
    },

    componentDidUpdate(props, state) {
        if (this.state.isEditing != state.isEditing && this.state.isEditing == true) {
            this.refs.updateComment.focus();
        }
    },

    toggleVote(e) {
        const currentUser = this.props.currentUser;

        if (currentUser) {
            this.props.toggleCommentVote(this.props.comment._id, (error) => {
                console.error(error);
            });
        }
    },

    deleteComment(e) {
		    this.props.deleteComment(this.props.comment._id, function(error) {
            if (error) {
                console.error(error);
            }
        });
    },

    updateComment(e) {
        const input = this.refs.updateComment;
        const isNotEmpty = !_.isEmpty(input.value());
        const currentUser = this.props.currentUser;

        if (isNotEmpty && currentUser) {

		        this.props.saveComment({ content: input }, { method: 'update', comment_id: this.props.comment._id }, (error, comment) => {
                if (error) {
                    console.error(error, comment);
                } else {
                    this.setState({ isEditing: false });
                }
            });
        }
    },

    setEditing(value) {
        if (Auth.helpers.isOwnerOf(this.props.comment, this.props.currentUser)) {
            return (e) => {
                this.setState({ isEditing: value });
            };
        } else {
            return null;
        }
    },

    toggleEdit(e) {
        if (Auth.helpers.isOwnerOf(this.props.comment, this.props.currentUser)) {
            this.setState({ isEditing: !this.state.isEditing });
        }
    },

    render() {
        const isLastComment = this.props.isLastComment;
        const comment       = this.props.comment;
        const currentUser   = this.props.currentUser;

        let id      = `comment-${comment._id}`;
        let user    = comment.user();
        let isOwner = Auth.helpers.isOwnerOf(comment, currentUser);
        let currentUserVotedForThis = currentUser && currentUser.hasVotedFor("comment", comment._id);

        if (isLastComment && isOwner) {
            var removeButton = (
                <span className="comment-remove">
                    <span className="dot-separator">.</span>
                    <Icon name="cross" type="text" onClick={this.deleteComment}>
                        <strong>Remove</strong>
                    </Icon>
                </span>
            );
        } else {
            var removeButton = null;
        }

        if (!currentUser) {
            var voteButton = (
                <span className="comment-votes">
                    <Icon name="thumb" onClick={this.props.showLogin} ><strong>{ comment.votes.toString() }</strong></Icon>
                </span>
            );
        } else if (isOwner) {
            var voteButton = (
                <span className="comment-votes">
                    <Icon name="thumb active enabled"><strong>{ comment.votes.toString() }</strong></Icon>
                </span>
            );
        } else {
            var voteButton = (
                <span className="comment-votes">
                    <Icon name={`thumb ${currentUserVotedForThis ? 'active' : ''}`} onClick={this.toggleVote}><strong>{ comment.votes.toString() }</strong></Icon>
                </span>
            );
        }

        return (
            <li className="analysis-comment" id={id}>
                <div className="user">
                    <img className="user-picture" src={user.profile.avatar || "/images/misc/mockup/spazie1.jpg"} />
                    <div className="user-info">
                        <span className="name">{user.username}</span>
                        <span className="level-of-play">{user.profile.level_of_play}</span>
                    </div>
                </div>
                <div className="comment-content" onDoubleClick={this.setEditing(true)}>
                    { this.state.isEditing ? <Smartarea type="smartarea" minRows={1} ref="updateComment" name="description" theme="blue" canSubmit={true} onSubmit={this.updateComment} onBlur={this.setEditing(false)} value={comment.content} /> : <MarkDown source={comment.content}/> }
                </div>

                <div className="comment-tools">
                    <em className="time">1 hour ago</em>
                    <span className="dot-separator">.</span>

                    {voteButton}


                    {Auth.helpers.isOwnerOf(comment, currentUser, (
                         <span>
                             <span className="dot-separator">.</span>
                             <span className="comment-edit">
                                 <Icon name="edit-green" onClick={this.toggleEdit}>
                                     <strong>{ this.state.isEditing ? "Cancel" : "Edit" }</strong>
                                 </Icon>
                             </span>
                         </span>
                    ))}
                    {removeButton}
                </div> 

            </li>
        );
    },
});

export default Comments;
