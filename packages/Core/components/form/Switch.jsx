import React from 'react';
import _ from 'lodash';

/*
 *  Switch Component
 *
 *    A switch. Seriously.
 *
 *    Examples:
 *
 *      <Switch type="switch" name="victory" onText="Victory" offText="Defeat" valueAsText={true} onChange={this.onSwitchChange} />
 *
 */

export default React.createClass({
    propTypes: {
        type:      React.PropTypes.oneOf(["switch"]).isRequired,
        name:      React.PropTypes.string.isRequired,
        onText:    React.PropTypes.string.isRequired, // Left side text
        offText:   React.PropTypes.string.isRequired, // Right side text
        valueAsText: React.PropTypes.bool, // Tells us if the value is returned as text or as a boolean
        onChange:  React.PropTypes.func
    },

    getInitialState() {
        return {
            checked: false,
            idForOn: Random.hexString(24),
            idForOff: Random.hexString(24)
        };
    },

    value() {
        const {on, off} = this.refs;
        if (this.props.valueAsText) {
            return on.checked ? on.value : off.value;
        } else {
            return on.checked;

        }
    },

    input() {
        return { on: this.refs.on, off: this.refs.off };
    },

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this.setState({ checked: !this.state.checked });
    },

    render() {
        return (
            <div className="switch-component switch-green">
                <input ref="on" type="radio" className="switch-input" name={this.props.name} value={this.props.onText} id={this.state.idForOn} checked={this.state.checked} onChange={this.onChange} />
                <label htmlFor={this.state.idForOn} className="switch-label switch-label-off">{this.props.onText}</label>

                <input ref="off" type="radio" className="switch-input" name={this.props.name} value={this.props.offText} id={this.state.idForOff} checked={!this.state.checked} onChange={this.onChange} />
                <label htmlFor={this.state.idForOff} className="switch-label switch-label-on">{this.props.offText}</label>

                <span className="switch-selection"></span>
            </div>
        );
    }
});
