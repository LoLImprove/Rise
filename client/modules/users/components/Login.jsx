import React from 'react';

const Login = React.createClass({
	  login(e) {
		    e.preventDefault();

		    const {loginUser} = this.props;
		    const {email, password} = this.refs;

		    loginUser(email.value, password.value);

		    email.value = '';
		    password.value = '';
	  },

	  render() {
		    const {error} = this.props;
		    return (
			      <div>
				        {error ? <p style={{color: 'red'}}>{error}</p> : null}
				        <form id="user-auth-form" className="login-form">
                    <fieldset>
                        <div className="form-group">
                            <label className="control-label" htmlFor="username">Username Or Email</label>
					                  <input ref="username" type="text" id="username" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="password">Password</label>
					                  <input ref="password" type="password" id="password" placeholder="***********" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                    </fieldset>
					          <button onClick={this.login} type="submit">Login</button>
				        </form>
			      </div>
		    );
	  }
});

export default Login;
