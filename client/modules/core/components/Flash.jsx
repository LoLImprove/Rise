import React from 'react';

const FlashComponent = React.createClass({
    componentDidMount() {
        const {Flash} = this.props;
        Flash.hasBeenSeen();
    },

    // Handles the show/hide of messages after a few seconds
    componentWillReceiveProps() {
        const {Flash} = this.props;

        // If we have message we hide them after 4 seconds
        if (Flash.hasMessages()) {
            setTimeout(() => {
                this.animator.visibility.fadeOut(this, 35, 500, () => {
                    Flash.hasBeenSeen();
                    // Reset the animation in case other flashes have been queued rapidly
                    this.animator.visibility.show(this); 
                });
            }, 4000);
        } else {
            this.animator.visibility.show(this);
        }
    },

    hideMessage(_id, e) {
        const {Flash} = this.props;
        Flash.hasBeenSeen(_id);
    },

    render() {
        return (
            <div className="flash-messages">
                {this.props.messages.map((message, index) =>
                    (
                        <div key={index} className={`flash-message alert alert-${message.type}`} style={this.animator.stylesFor(this, 'visibility')}>
                            <button className="close" onClick={this.hideMessage.bind(this, message._id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="flash-content">{message.content}</div>
                        </div>
                    )
                 )}
            </div>
        )
    }
});

export default FlashComponent;

