import React from 'react';
import Core from 'meteor/rise:core';
import Game from '/lib/game.js';

const Input = Core.Components.Form.Input;
const Youtube = Core.Libs.Youtube;

const ReplayForm = React.createClass({
    componentWillReceiveProps: function(props) {
        // On new/different errors
        console.log('receveid new Props');
        if (props.error && (props.error !== this.props.error)) {
            this.props.onError(props.error);
        }

        if (props.didSubmit) {
            this.submit();
            this.props.submitFinished();
        }
    },

	  submit(e) {
        if (e) { e.preventDefault(); }

        console.log('submit');
		    const {createReplay} = this.props;
		    const {video_id, victory, champion, matchup, lane, kda, duration, patch, description, replay_file} = this.refs;

		    const form = {video_id, victory, champion, matchup, lane, kda, duration, patch, description, replay_file };

		    createReplay(form, function(error) {
            console.log(errors);
        });
	  },

    characters() { return Game.data.characters.map((char) => { return { name: char } }); },
    lanes() { return Game.data.lanes.map((lane) => { return { name: lane } }); },

	  render() {
        // let popover = (<Popover id="popover" title="popover">very popover. such engagement</Popover>);
        // let tooltip = (<Tooltip id="tooletip">wow.</Tooltip>);

		    const {error} = this.props;
        console.log(this.props);
		    return (
			      <div>
				        {error ? <div className="alert alert-warning">{error}</div> : null}
				        <form id="replay-form" className="replay-form" ref="forminside" >
                    <fieldset>
                        <div className="form-line">
                            <Input type="url" provider={Youtube} ref="video_id" name="video_id" label="Video URL" placeholder="https://www.youtube.com/watch?v=_wXHR-lad-Q" />
                            <span className="separator"></span>
                            <Input type="switch" onText="Victory" offText="Defeat" ref="victory" name="victory" label="Game outcome" />
                        </div>

                        <div className="form-line">
                            <Input type="typeahead" ref="champion" name="champion" placeholder="Ahri" data={this.characters()} withPicture={true} source={Game.lib.characterPicture} />
                            <span className="separator">VS</span>
                            <Input type="typeahead" ref="matchup" name="matchup" placeholder="Zed" data={this.characters()} withPicture={true} source={Game.lib.characterPicture} />
                        </div>
                        <div className="form-line">
                            <Input type="typeahead" ref="lane" name="lane" placeholder="Bot - ADC" data={this.lanes()} withPicture={true} source={Game.lib.lanePicture} fullText={true} />
                            <Input type="separator" separator="/" pattern="\d{1,2}/\d{1,2}/\d{1,2}" ref="kda" name="kda" label="KDA" />
                            <Input type="separator" separator=":" pattern="\d{1,2}:\d{1,2}" ref="duration" name="duration" />
                            <Input type="separator" separator="." pattern="\d{1}.\d{2}" ref="patch" name="patch" value="6.22" />
                        </div>
                        <div className="form-line">
                            <Input type="smartarea" ref="description" name="description" full={true} theme="green" canSubmit={false} />
                        </div>
                        <div className="form-line">
                            <Input type="upload" through="ReplayUploader" allowed={['lpr']} ref="replay_file" name="replay_file" label="Add a replay file (.lpr, ...)" inputLabel="Upload" />
                        </div>
                    </fieldset>
				        </form>
			      </div>
		    );
	  }
});

export default ReplayForm;
