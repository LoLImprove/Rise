import React from 'react';
import Core from 'meteor/rise:core';
import Game from '/lib/game.js';

const Input = Core.Components.Form.Input;

const NewUser = React.createClass({
    componentWillReceiveProps: function(props) {
        // On new/different errors
        if (props.error && (props.error != this.props.error)) {
            this.props.onError(props.error);
        }

        if (props.didSubmit) {
            this.createUser();
            this.props.submitFinished();
        }
    },

	  createUser(e) {
        if (e) { e.preventDefault(); }

		    const {create} = this.props;
		    const {level_of_play, username, email, password} = this.refs;

        const form = {
            level_of_play: level_of_play.value(),
            username: username.value(),
            email: email.value(),
            password: password.value()
        };

		    create(form, function(error) {
            if (!error) {
		            email.value = '';
		            password.value = '';
            }
        });
	  },

	  render() {
		    const {error} = this.props;
		    return (
			      <div>
				        {error ? <div className="alert alert-warning">{error}</div> : null}
				        <form id="user-auth-form" className="register-form" ref="forminside" >
                    <fieldset>
                        <Input type="email" ref="email" name="email" placeholder="derick@gmail.com" />
                        <Input type="password" ref="password" name="password" placeholder="*********" />
                        <Input type="text" ref="username" name="username" placeholder="Your name on LoLImprove" />
                        <Input type="typeahead" ref="level_of_play" name="level_of_play" data={Game.data.ranks} placeholder="Gold V" />
                    </fieldset>
				        </form>
			      </div>
		    )
	  }
});

export default NewUser;
