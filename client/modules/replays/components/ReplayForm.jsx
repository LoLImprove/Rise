import React from 'react';
import Core from 'meteor/rise:core';

const Input = Core.Components.Form.Input;
const Youtube = Core.Libs.Youtube;

const ReplayForm = React.createClass({
    componentWillReceiveProps: function(props) {
        // On new/different errors
        if (props.error && (props.error !== this.props.error)) {
            this.props.onError(props.error);
        }

        if (props.didSubmit) {
            this.submit();
            this.props.submitFinished();
        }
    },

	  submit() {
	  },

	  render() {
        // let popover = (<Popover id="popover" title="popover">very popover. such engagement</Popover>);
        // let tooltip = (<Tooltip id="tooletip">wow.</Tooltip>);

		    const {error} = this.props;
		    return (
			      <div>
				        {error ? <div className="alert alert-warning">{error}</div> : null}
				        <form id="replay-new-form" className="replay-form" ref="forminside" >
                    <fieldset>
                        <Input type="url" provider={Youtube} ref="video_id" name="video_id" label="Video URL" placeholder="https://www.youtube.com/watch?v=_wXHR-lad-Q" />
                        <Input type="text" ref="victory" name="victory" label="Game outcome" />
                        <Input type="text" ref="victory" name="victory" label="Game outcome" />
                        <Input type="text" ref="champion" name="champion" />
                        <Input type="text" ref="matchup" name="matchup" />
                        <Input type="text" ref="lane" name="lane" />
                        <Input type="text" ref="kda" name="kda" label="KDA" />
                        <Input type="text" ref="duration" name="duration" />
                        <Input type="text" ref="patch" name="patch" />
                        <Input type="text" ref="description" name="description" />
                        <Input type="text" ref="replay_file" name="replay_file" />
                    </fieldset>
				        </form>
			      </div>
		    );
	  }
});

export default ReplayForm;
