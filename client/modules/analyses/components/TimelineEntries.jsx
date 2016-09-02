import React from 'react';
import _ from 'lodash';

import TimelineEntry from './TimelineEntry.jsx';

const TimelineEntries = React.createClass({
    propTypes: {
        entries: React.PropTypes.object.isRequired,
        showLogin: React.PropTypes.func.isRequired,
        isExpanded: React.PropTypes.bool.isRequired
    },
    render() {
        const entries = this.props.entries.map((entry, i) => {
            return ( <TimelineEntry entry={entry} showLogin={this.props.showLogin} currentUser={this.props.currentUser} comments={entry.comments()} key={i} /> );
        });

        return (
            <div className="timeline-entries slide heights">
                {entries}
            </div>
        );
    }
});

export default TimelineEntries;
