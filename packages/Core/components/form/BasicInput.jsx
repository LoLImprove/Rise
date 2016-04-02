import React from 'react';
import _ from 'lodash';

/*
 *  BasicInput Component
 *
 *    Any basic HTML input
 *
 *    Examples:
 *
 *      <BasicInput type="email" name="email" onChange={this.onChange} onFocus={this.onFocus} />
 *
 */

export default React.createClass({
    propTypes: {
        type:      React.PropTypes.string.isRequired,
        name:      React.PropTypes.string.isRequired,
        onChange:  React.PropTypes.func,
        onFocus:  React.PropTypes.func,
        onBlur:  React.PropTypes.func
    },

    getInitialState() {
        return { value: '' };
    },

    value() {
        return this.refs.input.value;
    },

    input() {
        return this.refs.input;
    },

    render() {
        return (
            <input ref="input"
                   type={this.props.type || "text"}
                   name={_.snakeCase(this.props.name)}
                   onChange={this.props.onChange || (()=>{})}
                   onFocus={this.props.onFocus || (()=>{})}
                   onBlur={this.props.onBlur || (()=>{})}
                   id={_.snakeCase(this.props.name)}
                   className={`form-control ${this.props.className || ''}`}
                   placeholder={this.props.placeholder || ""} />
        );
    }
});
