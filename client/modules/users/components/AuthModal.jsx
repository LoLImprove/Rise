import React from 'react';
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';
import RegisterForm from '../containers/NewUser.js';
import LoginForm from '../containers/Login.js';
import ForgotPassword from '../containers/Login.js';

const AuthModal = React.createClass({
    getInitialState(props) {
        return { showModal: false, forgotPassword: false, register: false, didSubmit: false };
    },

    forgotPassword() {
        this.setState({ register: false, forgotPassword: true });
    },

    toggleRegister() {
        this.setState({ register: !this.state.register, forgotPassword: false });
    },

    close() {
        this.setState({ showModal: false, forgotPassword: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    submitAuthForm() {
        this.setState({ didSubmit: true });
    },

    submitFinished() {
        this.setState({ didSubmit: false});
    },

    authComponent() {
        if (this.state.forgotPassword) {
            return (<ForgotPassword didSubmit={this.state.didSubmit} submitFinished={this.submitFinished} />);
        } else if (this.state.register) {
            return (<RegisterForm didSubmit={this.state.didSubmit} submitFinished={this.submitFinished} />);
        } else {
            return (<LoginForm didSubmit={this.state.didSubmit} submitFinished={this.submitFinished} />);
        }
    },

    render() {
        let popover = <Popover id="popover" title="popover">very popover. such engagement</Popover>;
        let tooltip = <Tooltip id="tooletip">wow.</Tooltip>;

        return (
            <span>
                <a href="#" className="sign-in" onClick={this.open}>{this.props.button}</a>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.register ? 'Register' : 'Login' }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div ref="auth-form-2">
                            {this.authComponent()}
                        </div>
                        <div className="user-auth-tools">
                            <a href="#" onClick={this.toggleRegister} className="toggle-registration">
                                {this.state.register ? 'Already have an account ? Sign in !' : "Don't have an account ? Create one !" }
                            </a>
                            <a href="#" onClick={this.forgotPassword} className="toggle-forgot-password">
                                Forgot your password ?
                            </a>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="validate-btn btn btn-primary" onClick={this.submitAuthForm}>Login</button>
                        <button className="cancel-btn btn btn-default" onClick={this.close}>Close</button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    }
});

export default AuthModal;
