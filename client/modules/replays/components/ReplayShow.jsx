import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';

import Core from 'meteor/rise:core';

import Animate from '/client/composers/Animate.jsx';
import { Auth } from '/client/composers/Auth.jsx';
import Player from './Player.jsx';

const Icon = Core.Components.Icon;


const ReplayShow = React.createClass({
    propTypes: {
        replayId: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            excerpt: true,
            isAnalyzing: false,
        };
    },

    editReplayRoute() {
        return FlowRouter.path('replays:edit', { replayId: this.props.replayId });
    },

    toggleExcerpt() {
        this.setState({ excerpt: !this.state.excerpt });
    },

    render() {
        const { replay, replayUser } = this.props;
        const meta = replay.meta_information;
        const currentUser = this.props.user || {};

        if (!_.isEmpty(replay.replay_file)) {
            var replay_file = (
                <li className="replay-file">
                    <a href={replay.replay_file}>
                        <Icon name="download">
                            Download LPR File
                        </Icon>
                    </a>
                </li>
            );
        }

        return (
            <div className="replay-view">
                <header className="replay-header">
                    <h2 className="replay-title">
                        <strong>{_.capitalize(meta.champion)}</strong> vs <strong>{_.capitalize(meta.matchup)}</strong> - <strong>{_.capitalize(meta.lane)}</strong>
                    </h2>
                    <h3 className="replay-result">
                        {replay.outcome()}
                    </h3>
                </header>

                <div className="content">
                    <section className="replay">
                        <div className="rise-replay-container replay-player">
                            <Player ref="player" provider="youtube" videoId={replay.video_id} isAnalyzing={this.state.isAnalyzing} />
                        </div>

                        <section className="replay-info">
                            <div className="info-container">
                                <div className="user">
                                    <img className="user-picture" src={replayUser.profile.avatar || "/images/misc/mockup/ascensionfull.jpg"} />
                                    <div className="user-info">
                                        <span className="name">{replayUser.username}</span>
                                        <span className="level-of-play">{replayUser.profile.level_of_play}</span>
                                    </div>
                                </div>

                                <div className={`replay-description ${this.state.excerpt ? '' : 'full'}`}>
                                    <span className="description slideDown closed">
                                        {this.state.excerpt ? <MarkDown source={replay.excerpt()}/> : <MarkDown source={replay.description}/> }
                                    </span>
                                    {this.state.excerpt ? (<Icon name="more" onClick={this.toggleExcerpt}/>) : (<Icon name="less" onClick={this.toggleExcerpt}/>)}
                                </div>

                                <ul className="game-data">
                                    <li className="length">
                                        <Icon name="time" /> {replay.duration}
                                    </li>
                                    <li className="kda">
                                        <Icon name="kda" /> {meta.kda}
                                    </li>
                                    <li className="patch">
                                        <Icon name="info" /> {replay.patch}
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="replay-tools">
                            <ul className="replay-menu">
                                {replay_file}
                                <li>
                                    <a href="#" className="report-replay">
                                        <Icon name="report-green">
                                            Report this replay
                                        </Icon>
                                    </a>
                                </li>
                                {Auth.helpers.isOwnerOf(replay, currentUser, (
                                     <li>
                                         <a href={this.editReplayRoute()} className="edit-replay">
                                             <Icon name="edit-green">
                                                 Edit your replay
                                             </Icon>
                                         </a>
                                     </li>
                                 ))}
                            </ul>

                        </section>
                    </section>
                </div>
            </div>);
    },
});

export default Animate.extend(ReplayShow);

/*

   {{ #if currentUser }}
   {{ #isNotOwnerOf this }}
   {{ #if $or isAnalyzing isEditing }}
   <button className="call-to-action edit-general-note">
   <i className="icon icon-feather"></i>
   <span className="icon-text">Add a general note</span>
   </button>
   <button className="call-to-action add-timeline-entry">
   <i className="icon icon-feather"></i>
   <span className="icon-text">Add an entry to timeline</span>
   </button>
   {{ else }}
   {{ #if currentUserAnalysis }}
   <button className="call-to-action edit-analysis">
   <i className="icon icon-feather"></i>
   <span className="icon-text">Improve your analysis !</span>
   </button>
   {{ else }}
   <button className="call-to-action start-analysis">
   <i className="icon icon-feather"></i>
   <span className="icon-text">Advise this fellow !</span>
   </button>
   {{ /if }}
   {{ /if }}
   {{ /isNotOwnerOf }}
   {{ else }}
   <button className="call-to-action redirect-to-login">
   <i className="icon icon-feather"></i>
   <span className="icon-text">Advise this fellow !</span>
   </button>
   {{ /if }}

   {{ > AnalysesView this }}

 */
