import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';

import Core from 'meteor/rise:core';

import { Auth } from '/client/composers/Auth.jsx';

import Comments from '/client/modules/comments/containers/Comments.js';

const TimelineEntry = React.createClass({
    propTypes: {
        entry: React.PropTypes.object.isRequired,
        comments: React.PropTypes.object.isRequired,
        showLogin: React.PropTypes.func.isRequired,
        currentUser: React.PropTypes.any
    },
    render() {
        const {entry, currentUser, comments} = this.props;

        return (
            <div className="timeline-entry">
                <div className="time-block">
                    <strong className="time-text">at</strong><strong className="time">{entry.time}</strong>
                </div>

                <div className="entry-container">
                    <div className="entry-content">
                        <MarkDown source={entry.content} />
                    </div>

                    <Comments currentUser={currentUser}
                              showLogin={this.props.showLogin}
                              parent={entry}
                              comments={comments}
                              canPost={true} />
                </div>
            </div> 
        );
    }
});

export default TimelineEntry;

