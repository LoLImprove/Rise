import React from 'react';

const NewUser = React.createClass({
    componentWillReceiveProps: function(props) {
        if (props.didSubmit) {
            this.createUser();
            this.props.submitFinished();
        }
    },

	  createUser(e) {
        if (e) {
		        e.preventDefault();
        }

		    const {create} = this.props;
		    const {email, password} = this.refs;
		    create(email.value, password.value);
		    email.value = '';
		    password.value = '';
	  },

	  render() {
		    const {error} = this.props;
		    return (
			      <div>
				        <h1>Register</h1>
				        {error ? <p style={{color: 'red'}}>{error}</p> : null}
				        <form>
					          <input ref="email" type="email" placeholder="Email" />
					          <input ref="password" type="password" placeholder="Password" />
				        </form>
			      </div>
		    )
	  }
});

export default NewUser;
