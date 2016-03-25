import React from 'react';
import AuthModal from '../../users/components/AuthModal.jsx';

const NavProfile = React.createClass({
    userInfos() {
        if (this.props.loggedIn) {
            return (
                <a href="pathFor route='profile' username=currentUser.username">
                    <img className="user-picture" src="/images/misc/mockup/ascensionfull.jpg"/>
                    <span className="user-name">{this.props.user.username}</span>
                </a>
            );
        } else {
            return (<span></span>);
        }
    },

    userAuthButtons() {
        if (this.props.loggedIn) {
            return (
                <a href="#" className="log-out" onClick={this.logout}>Log out</a>
            );
        } else {
            return (
                <AuthModal button="Sign In" />
            );
        }
    },

    // Pass an empty callback so Meteor logout doesn't throw an error
    logout() { this.props.logout(()=>{}); },

    render() {
        return (
            <div>
                <ul className="user">
                    <li className="infos">{this.userInfos()}</li>
                    <li className="align-middle">{this.userAuthButtons()}</li>
                    <li className="notifications">0</li>
                </ul>
            </div>
            
        )
    }
});


export default NavProfile;
