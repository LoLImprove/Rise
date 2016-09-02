import React from 'react';
import _ from 'lodash';

import Typeahead from './Typeahead.jsx';
import BasicInput from './BasicInput.jsx';
import UrlInput from './UrlInput.jsx';
import Switch from './Switch.jsx';
import Separator from './SeparatorInput.jsx';
import Smartarea from './Smartarea.jsx';
import UploadInput from './UploadInput.jsx';

/*
 *  Input Component
 *
 *    A factory component allowing you to render different inputs according to the props.type.
 *    Also adds label + bootstrap styles
 *
 *    Available types:
 *
 *      - Typeahead (`typehead`) : An autocomplete input
 *      - UrlInput (`url`) : An input with URL validation
 *      - Switch (`switch`) : A switch button
 *      - Separator (`separator`) : An input with separated values such as 14/02/1991
 *      - Smartarea (`smartarea`) : A textarea that handles markdown, has a formatting help and other features
 *      - UploadInput (`upload`) : An upload input based on meteor-slingshot and NiceFileInput.js
 *      - BasicInput (Any html basic type such as `text`, `email`, ...) : An classic input
 *
 *
 *    Methods:
 *
 *      This component provide methods to access the underlying input, values, etc...
 *
 *      - input() : returns the DOM element
 *      - value() : returns the value of the input (might differ from the actual DOM value)
 *      - valid() : Returns true or false. Might not be implemented, in this case it will return true
 *      - error() : Returns null or an object {reason: '', message: ''} Might not be implemented, in this case it will return false
 *      - component() : Returns the underlying component
 *
 *    Examples:
 *
 *      <Input type="typeahead" ref="input" name="champion" placeholder="Ahri" data={this.characters()} />
 *      <Input type="switch" onText="Victory" offText="Defeat" ref="input" name="victory" label="Game outcome" />
 *      ...
 *
 */

export default React.createClass({
    propTypes: {
        type:  React.PropTypes.string.isRequired,
        name:  React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        label: React.PropTypes.string,
        placeholder: React.PropTypes.string
    },

    value() {
        // Child Inputs need to implement a value() method that returns the ref's value
        return this.refs.input.value();
    },

    input() {
        // Child Inputs need to implement an input() method that returns the ref's input
        return this.refs.input.input();
    },

    valid() {
        return this.refs.input.valid ? this.refs.input.valid() : true;
    },

    error() {
        return this.refs.input.error ? this.refs.input.error() : null;
    },

    component() {
        return this.refs.input;
    },

    render() {
        var input = null;
        if (this.props.type == "typeahead") {
            input = (<Typeahead {...this.props} ref="input" />);
        } else if (this.props.type == "url") {
            input = (<UrlInput {...this.props} ref="input"/>);
        } else if (this.props.type == "switch") {
            input = (<Switch {...this.props} ref="input"/>);
        } else if (this.props.type == "separator") {
            input = (<Separator {...this.props} ref="input"/>);
        } else if (this.props.type == "smartarea") {
            input = (<Smartarea {...this.props} ref="input"/>);
        } else if (this.props.type == "upload") {
            input = (<UploadInput {...this.props} ref="input"/>);
        } else {
            input = (<BasicInput {...this.props} ref="input"/>);
        }

        var label = (
            <label className="control-label" htmlFor={this.props.name}>
                {this.props.label || _.capitalize(this.props.name.replace(/-|_/g, " "))}
            </label>
        );

        if (this.props.label == false) {
            label = '';
        } 

        return (
            <div className={`form-group ${_.kebabCase(this.props.name).toLowerCase()}`}>
                {label}
                {input}
                <span className="help-block"></span>
            </div>
        );
    }
});
