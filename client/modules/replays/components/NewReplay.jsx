import React from 'react';
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

import Animate from '/client/composers/Animate.jsx';
import ReplayForm from '../containers/ReplayForm.js';
import { Auth } from '/client/composers/Auth.jsx';

const NewReplay = React.createClass({
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
        return Auth.helpers.render(this.props, () => {
            return (
                <span>
                  <Modal show={true} className={this.animator.target(this).animationClass()} >
                      <Modal.Header closeButton>
                      <Modal.Title>
                          Post a new replay
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ReplayForm didSubmit={this.state.didSubmit} submitFinished={this.submitFinished} onError={this.onError} />
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

export default Animate.extend(NewReplay);
