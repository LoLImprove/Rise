import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';

import Core from 'meteor/rise:core';

import Animate from '/client/composers/Animate.jsx';
import { Auth } from '/client/composers/Auth.jsx';

import Comments from '/client/modules/comments/components/Comments.jsx';

const GeneralNote = React.createClass({
    propTypes: {
        generalNote: React.PropTypes.object.isRequired,
        toggleExpansion: React.PropTypes.func.isRequired,
        isExpanded: React.PropTypes.bool.isRequired
    },
    render() {
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
                    <div onClick={this.props.toggleExpansion} className="analysis-expand toggle-expansion">See more...</div>
                </span>
            );
        }

        return (
            <div className="general-notes">
                <div className="general-notes-content">
                    <h4 className="analysis-title">General Notes</h4>
                    <div className="general-notes-text">
                        {generalNoteContent}
                    </div>
                </div>

                { this.props.isExpanded ? <Comments comments={this.props.generalNote.comments()} canPost={true} /> : '' }
            </div> 
        );
    }
});

export default GeneralNote;
