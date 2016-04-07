import React from 'react';
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

import Animate from '/client/composers/Animate.jsx';
import ReplayForm from '../containers/ReplayForm.js';
import { Auth } from '/client/composers/Auth.jsx';

const ReplayEdit = React.createClass({
    close() {
        FlowRouter.back();
    },

    submitForm() {
        this.setState({ didSubmit: true });
    },

    submitFinished() {
        this.setState({ didSubmit: false });
    },

    onError(error) {
        this.animator.target(this).animateWithCss('shake');
    },

    render() {
        const permission = { hasPermission: this.props.hasPermissionsFor(this.props.replay) };

        return Auth.helpers.render({...permission, ...this.props}, () => {
            return (
                <span>
                    <Modal show={true} className={this.animator.target(this).animationClass()} onHide={this.close} >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Edit your replay
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ReplayForm replay={this.props.replay} didSubmit={this.state.didSubmit} submitFinished={this.submitFinished} onError={this.onError} />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="validate-btn btn btn-primary" onClick={this.submitForm}>
                                Save
                            </button>
                            <button className="cancel-btn btn btn-default" onClick={this.close}>Cancel</button>
                        </Modal.Footer>
                    </Modal>
                </span>
            );
        });
    }
});

export default Animate.extend(ReplayEdit);
