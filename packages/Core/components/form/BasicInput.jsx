import React from 'react';
import _ from 'lodash';

export default React.createClass({
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
                   id={_.snakeCase(this.props.name)}
                   className={`form-control ${this.props.className || ''}`}
                   placeholder={this.props.placeholder || ""} />
        );
    }
});
