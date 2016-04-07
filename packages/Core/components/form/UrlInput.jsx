import React from 'react';
import _ from 'lodash';

import Spinner from '../Spinner.jsx';
import Icon from '../Icon.jsx';

/*
 *  UrlInput Component
 *
 *    An input that checks if a resource at an URL exists
 *    You need to provide your own provider.
 *
 *    Examples:
 *
 *      YoutubeProvider = {
 *        Tools: {
 *                 getID(inputValue) {
 *                   // the value returned by this function will be used by #resourceExists
 *                 },
 *                 getURL(id) {}, // Inverse of getID
 *                 resourceExists(value, { success = (()=>()), error = (()=>()), done = (()=>()) }) {
 *                   // does what's needed to validate the resource and calls the callbacks accordingly
 *                 },
 *        }
 *      }
 *
 *      <UrlInput type="url" name="yturl" provider={YoutubeProvider} />
 *
 *
 */

export default React.createClass({
    propTypes: {
        type:      React.PropTypes.oneOf(["url"]).isRequired,
        name:      React.PropTypes.string.isRequired,
        provider:  React.PropTypes.object.isRequired, 
        value:     React.PropTypes.string,
        valueAsId: React.PropTypes.bool,
        onChange:  React.PropTypes.func,
        onFocus:   React.PropTypes.func,
        onBlur:    React.PropTypes.func,
        placeholder:  React.PropTypes.string
    },

    getDefaultProps() {
        return {
            valueAsId: true
        };
    },

    getInitialState() {
        return { value: null, valid: null, error: null, loading: false, typingTimer: null };
    },

    componentDidMount() {
        if (this.props.value) {
            let getURL = this.props.provider.Tools.getURL;
            this.setState({ value: getURL(this.props.value) });
            this.checkInputValue(this.props.value);
        }
    },

    value() {
        const getID = this.props.provider.Tools.getID;
        if (this.props.valueAsId) {
            return getID(this.state.value);
        } else {
            return this.state.value;
        }
    },

    input() {
        return this.refs.input;
    },

    valid() {
        if (!this.state.valid) {
            this.setState({ error: { reason: "Invalid URL", message: `The given ${this.props.name} is invalid` }})
        } else {
            this.setState({ error: null });
        }
        return this.state.valid;
    },

    error() {
        return this.state.error;
    },

    checkInputValue(value) {
        const component = this;
        const {input} = this.refs;
        const {provider} = this.props;

        var value = value || input.value;

        // Only if input value is different
        if (provider) {
            let { resourceExists, getID } = provider.Tools;
            resourceExists(getID(value), {
                loading() { component.setState({ valid: null,  loading: true }) },
                success() { setTimeout(() => { component.setState({ valid: true,  loading: false }) }, 1200) },
                error()   { setTimeout(() => { component.setState({ valid: false, loading: false }) }, 1200) }
            });
        }

        if (_.isEmpty(value)) {
            this.setState({ loading: false, valid: null });
        } 


    },

    check(e) {
        clearTimeout(this.state.typingTimer);
        let typingTimer = setTimeout(this.checkInputValue, 500);
        this.setState({ typingTimer: typingTimer, value: this.refs.input.value });
    },

    render() {
        if (this.props.provider) {
            return (
                <span className="input-type-url">
                  <input ref="input"
                         type="text"
                         value={this.state.value}
                         name={_.snakeCase(this.props.name)}
                         id={_.snakeCase(this.props.name)}
                         onChange={this.check}
                         className={`form-control ${this.props.className || ''}`}
                         placeholder={this.props.placeholder || ""} />

                  {this.state.loading ? <Spinner /> : '' }
                  {this.state.valid === true ? <Icon name="tick" type="text" explanation="Your video link is valid" /> : '' }
                  {this.state.valid === false ? <Icon name="cross" type="text" explanation="Video could not be found" /> : '' }
                </span>
            );
        } else {
            // If no provider, BasicInput
            return (
                <input ref="input"
                       type="text" 
                       name={_.snakeCase(this.props.name)}
                       id={_.snakeCase(this.props.name)}
                       className={`form-control ${this.props.className || ''}`}
                       placeholder={this.props.placeholder || ""} />
            );
        }
    }
});
