import React from 'react';

const NewUser = React.createClass({
    componentWillReceiveProps: function(props) {
        // On new/different errors
        console.log(props.error, this.props.error);
        if (props.error && (props.error !== this.props.error)) {
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
		    const {email, password} = this.refs;

		    create(email.value, password.value, function(error) {
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
                        <div className="form-group">
                            <label className="control-label" htmlFor="username">Username</label>
					                  <input ref="username" type="text" id="username" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Email</label>
					                  <input ref="email" type="email" id="email" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="IGN">IGN</label>
					                  <input ref="IGN" type="text" id="IGN" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="level_of_play">Level of play</label>
					                  <input ref="level_of_play" type="text" id="level_of_play" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="password">Password</label>
					                  <input ref="password" type="password" id="password" placeholder="***********" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                    </fieldset>
				        </form>
			      </div>
		    )
	  }
});

export default NewUser;
