import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';

import Core from 'meteor/rise:core';

import Animate from '/client/composers/Animate.jsx';
import { Auth } from '/client/composers/Auth.jsx';

import Comments from '/client/modules/comments/components/Comments.jsx';

const Icon = Core.Components.Icon;
const Link = Core.Components.Link;

const TimelineEntries = React.createClass({
    propTypes: {
        entries: React.PropTypes.object.isRequired,
        isExpanded: React.PropTypes.bool.isRequired
    },
    render() {
        const entries = this.props.entries.map((entry) => {
            return (
                <div className="timeline-entry">
                    <div className="time-block">
                        <strong className="time-text">at</strong><strong className="time">{entry.time}</strong>
                    </div>

                    <div className="entry-container">
                        <div className="entry-content">
                            {entry.content}
                        </div>

                        <Comments comments={entry.comments()} canPost={true} />
                    </div>
                </div> 
            );
        });

        return (
            <div className="timeline-entries slide heights">
                {entries}
            </div>
        );
    }
});

export default TimelineEntries;
