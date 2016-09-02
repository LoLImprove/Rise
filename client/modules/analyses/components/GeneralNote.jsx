import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';
import Inflector from 'lodash-inflection';

import Core from 'meteor/rise:core';

import Animate from '/client/composers/Animate.jsx';
import { Auth } from '/client/composers/Auth.jsx';

import Comments from '/client/modules/comments/containers/Comments.js';

_.mixin(Inflector);

const GeneralNote = React.createClass({
    propTypes: {
        generalNote: React.PropTypes.object.isRequired,
        toggleExpansion: React.PropTypes.func.isRequired,
        showLogin: React.PropTypes.func.isRequired,
        isExpanded: React.PropTypes.bool.isRequired
    },

    getInitialState() {
        return {
            showComments: false
        };
    },

    toggleComments(e) {
        this.setState({ showComments: !this.state.showComments });
    },

    showCommentsAndFocus(e) {
        const {comments} = this.refs;

        if (!this.state.showComments) {
            this.setState({ showComments: true });
        }
        if (comments) {
            console.log(comments);
            comments.goToInput();
        } 
    },

    render() {
        var comments = this.props.generalNote.comments();

        if (this.props.isExpanded) {
            if (this.state.showComments) {
                var showCommentsButtonText = `Hide the ${_.pluralize('comment', comments.count())}`;
            } else {
                var showCommentsButtonText = `Read the ${comments.count()} ${_.pluralize('comment', comments.count())}`;
            }

            var commentsView = (
                <span>
                    <span className="comments-actions">
                        <span className="action show-comments" onClick={this.toggleComments}>{showCommentsButtonText}</span>
                        <span className="dot-separator">.</span>
                        <span className="action comment-reply" onClick={this.showCommentsAndFocus}>Reply</span>
                    </span>
                    <Comments ref="comments" className={`${this.state.showComments ? 'shown' : 'hidden' }`} currentUser={this.props.currentUser} parent={this.props.generalNote} showLogin={this.props.showLogin} comments={comments} canPost={true} />
                </span>
            );
        } else {
            var commentsView = (
                <div onClick={this.props.toggleExpansion} className="analysis-expand toggle-expansion">See more...</div>
            );
        }
        var generalNoteContent;
        if (this.props.isExpanded) {
            generalNoteContent = (
                <span>
                    <MarkDown source={this.props.generalNote.excerpt()}/>
                </span>
            );
        } else {
            generalNoteContent = (
                <span>
                    <MarkDown source={this.props.generalNote.content}/>
                </span>
            );
        }

        return (
            <div className={`general-notes ${this.state.showComments ? 'fully-open' : '' }`}>
                <div className="general-notes-content">
                    <h4 className="analysis-title">General Notes</h4>
                    <div className="general-notes-text">
                        {generalNoteContent}
                    </div>
                </div>

                {commentsView}
            </div>
        );
    }
});

export default GeneralNote;
