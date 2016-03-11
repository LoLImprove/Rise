import React from 'react';

class Login extends React.Component {
	render() {
		const {error} = this.props;
		return (
			<div>
				<h1>Login</h1>
				{error ? <p style={{color: 'red'}}>{error}</p> : null}
				<form>
					<input ref="email" type="email" placeholder="Email" />
					<input ref="password" type="password" placeholder="Password" />
					<button onClick={this.login.bind(this)} type="submit">Login</button>
				</form>
			</div>
		)
	}

	login(e) {
		e.preventDefault();
		const {loginUser} = this.props;
		const {email, password} = this.refs;
		loginUser(email.value, password.value);
		email.value = '';
		password.value = '';
	}
}

export default Login;
