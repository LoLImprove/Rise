import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';

import Core from 'meteor/rise:core';

import Animate from '/client/composers/Animate.jsx';
import { Auth } from '/client/composers/Auth.jsx';

import GeneralNote from './GeneralNote.jsx';
import TimelineEntries from './TimelineEntries.jsx';

const Icon = Core.Components.Icon;
const Link = Core.Components.Link;

const Analysis = React.createClass({
    propTypes: {
        analysis: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            isExpanded: false,
            isEditing: false,
            isOwner: false,
        }
    },

    componentDidMount() {
        this.setState({ isOwner: Auth.helpers.isOwnerOf(this.props.analysis, this.props.currentUser) || false });
    },

    componentWillReceiveProps(props) {
        if (this.props.currentUser != props.currentUser) {
            this.setState({ isOwner: Auth.helpers.isOwnerOf(props.analysis, props.currentUser) || false });
        }
    },

    toggleVote(e) {
        // TODO
    },

    toggleExpansion(e) {
        this.setState({ isExpanded: !this.state.isExpanded });
    },

    render() {
        const { analysis, replay, currentUser } = this.props;
        const analysisUser = analysis.user();

        var editButton;
        if (this.state.isOwner && !this.state.isEditing) {
            var editButton = (<button className="edit-analysis">Edit</button>);
        } 

        // TODO: Add me some nice animation boyyy
        //                     <Link href="/" for="analysis:show" data={({analysisId: analysis._id})} >
        const expandedMenu = (
            <div className="analysis-expanded-menu">
                <div className="permalink">
                    <Link href="/" for="analysis:show" data={({replayId: replay._id, analysisId: analysis._id})} >
                        Permalink
                    </Link>
                </div>

                <div className="analysis-tools">
                    <span className="analysis-time">
                        2 hours ago
                    </span>

                    <a href="#" className="analysis-report">
                        <Icon name="report">Report</Icon>
                    </a>
                </div>
            </div>
        );

        return (
            <section className="analysis">
                <div className="analysis-info">
                    <div className="user">
                        <img className="user-picture" src={analysisUser.profile.avatar || "/images/misc/mockup/spazie1.jpg"} />
                        <div className="user-info">
                            <span className="name">{analysisUser.username}</span>
                            <span className="level-of-play">{analysisUser.profile.level_of_play}</span>
                        </div>
                    </div>
                    <div className="analysis-votes">
                        <Icon name="big-thumb" childPosition="left" onClick={this.state.isOwner ? null : this.toggleVote}>
                            {analysis.votes}
                        </Icon>
                    </div>

                    {this.state.isExpanded ? expandedMenu : ''}

                    <div onClick={this.toggleExpansion} className="analysis-collapse collapse-button toggle-expansion">
                        <Icon name="double-arrow up">{this.state.isExpanded ? 'Collapsed' : 'Expand'}</Icon>
                        <Icon name="double-arrow up right" />
                    </div>
                </div> 

                <div className={`analysis-content ${this.state.isExpanded ? 'expanded' : ''}`}>
                    <GeneralNote generalNote={analysis.generalNote()} isExpanded={this.state.isExpanded} toggleExpansion={this.toggleExpansion} />
                    { this.state.isExpanded ? <TimelineEntries entries={analysis.timelineEntries()} isExpanded={this.state.isExpanded} /> : '' }
                </div>
            </section>
        );
    }
});

export default Animate.extend(Analysis);
