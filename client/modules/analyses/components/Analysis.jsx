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
        showLogin: React.PropTypes.func.isRequired,
        currentUser: React.PropTypes.any
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
            var editButton = (<button className="edit-analysis"><Icon name="feather">Edit</Icon></button>);
        }

        // TODO: Add me some nice animation boyyy
        //                     <Link href="/" for="analysis:show" data={({analysisId: analysis._id})} >
        const expandedMenu = (
            <div className="analysis-expanded-menu">
                <div className="analysis-tools">
                    <Link href="/" for="analysis:show" data={({replayId: replay._id, analysisId: analysis._id})} >
                        <span className="analysis-time">
                            2 hours ago
                        </span>
                    </Link>

                    <a href="#" className="analysis-report">
                        <Icon name="report-green">Report</Icon>
                    </a>
                </div>
            </div>
        );

        return (
            <span>
                {editButton}
                <section className="analysis">
                    <div className={`analysis-info ${this.state.isExpanded ? 'expanded' : ''}`}>
                        <div className="user">
                            <img className="user-picture" src={analysisUser.profile.avatar || "/images/misc/mockup/spazie1.jpg"} />
                            <div className="user-info">
                                <span className="name">{analysisUser.username}</span>
                                <span className="level-of-play">{analysisUser.profile.level_of_play}</span>
                            </div>
                        </div>
                        <div className="analysis-votes">
                            <Icon name="big-thumb" childPosition="left" onClick={this.state.isOwner ? null : this.toggleVote}>
                                {analysis.votes.toString()}
                            </Icon>
                        </div>

                        {this.state.isExpanded ? expandedMenu : ''}

                        <div onClick={this.toggleExpansion} className="analysis-collapse collapse-button toggle-expansion">
                            <Icon name={`double-arrow ${this.state.isExpanded ? 'up' : 'down'} left`} />
                            <span className="middle-text">{this.state.isExpanded ? 'Collapse' : 'Expand'}</span>
                            <Icon name={`double-arrow ${this.state.isExpanded ? 'up' : 'down'} right`} />
                        </div>
                    </div>

                    <div className={`analysis-content ${this.state.isExpanded ? 'expanded' : ''}`}>
                        <GeneralNote currentUser={this.props.currentUser} generalNote={analysis.generalNote()} showLogin={this.props.showLogin} isExpanded={this.state.isExpanded} toggleExpansion={this.toggleExpansion} />
                        { this.state.isExpanded ? <TimelineEntries currentUser={this.props.currentUser} entries={analysis.timelineEntries()} showLogin={this.props.showLogin} isExpanded={this.state.isExpanded} /> : '' }
                    </div>
                </section>
            </span>
        );
    }
});

export default Animate.extend(Analysis);
