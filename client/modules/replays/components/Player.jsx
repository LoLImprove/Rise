import React from 'react';
import Core from 'meteor/rise:core';
import Game from '/lib/game.js';

const Youtube = Core.Libs.Youtube;

const Player = React.createClass({
    providers: {
        youtube: Youtube
    },

    propTypes: {
        provider: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired,
        isAnalyzing: React.PropTypes.bool.isRequired,
        onEditGeneralNote: React.PropTypes.func,
        onCommentAction: React.PropTypes.func
    },

    getInitialState() {
        return {
            api: {},
            status: null,
            isReady: false,
            isRunning: false,
        };
    },

    componentDidMount() {
        component = this;
        const api = Youtube.DOM.Player(this.refs.player, {
            videoId: this.props.videoId,
            dimensions: 'relative',
            onPlayerReady: (api, e) => {
                component.setState({ isReady: true, status: "ready" });
            },
            onPlayerStarted: (api, e) => {
                component.setState({ status: "playing", isRunning: true });
            },
            onPlayerStopped: (api, e, time) => {
                component.setState({ status: "paused", time: time });
            }
        });

        this.setState({ api });
    },

    onEditGeneralNote(e) {
        this.state.api.player.pauseVideo();
        if (this.props.onEditGeneralNote) {
            this.props.onEditGeneralNote(e);
        }
    },

    onCommentAction(e) {
        this.state.api.player.pauseVideo();
        if (this.props.onCommentAction) {
            this.props.onCommentAction(e);
        }
    },

	  render() {
        var menu = '';
        if (this.state.isRunning || this.props.isAnalyzing) {
            menu = (
                <span>
                    <button onClick={this.onEditGeneralNote} className="rise-player-action edit-general-note">Edit general note</button>
                    <button onClick={this.onCommentAction} className="rise-player-action add-timeline-entry">Comment this action</button>
                </span>
            );
        }

        return (
            <span>
                {menu}
                <div ref="player" id="rise-player"></div>
            </span>
        );
    }
});

export default Player;
