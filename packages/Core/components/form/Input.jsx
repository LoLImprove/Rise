import React from 'react';
import _ from 'lodash';

import Typeahead from './Typeahead.jsx';
import BasicInput from './BasicInput.jsx';
import UrlInput from './UrlInput.jsx';

export default React.createClass({
    getInitialState() {
        return {
            value: '',
        };
    },

    value() {
        // Child Inputs need to implement a value() method that returns the ref's value
        return this.refs.input.value();
    },

    input() {
        // Child Inputs need to implement an input() method that returns the ref's input
        return this.refs.input.input();
    },

    render() {
        var input = null;
        if (this.props.type == "typeahead") {
            input = (<Typeahead {...this.props} ref="input" />);
        } else if (this.props.type == "url") {
            input = (<UrlInput {...this.props} ref="input"/>);
        } else {
            input = (<BasicInput {...this.props} ref="input"/>);
        }

        return (
            <div className={`form-group ${_.kebabCase(this.props.name).toLowerCase()}`}>
                <label className="control-label" htmlFor={this.props.name}>
                    {this.props.label || _.capitalize(this.props.name.replace(/-|_/g, " "))}
                </label>
                {input}
                <span className="help-block"></span>
            </div>
        );
    }
});
