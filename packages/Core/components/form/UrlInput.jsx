import React from 'react';
import _ from 'lodash';

import Spinner from '../Spinner.jsx';
import Icon from '../Icon.jsx';

export default React.createClass({
    // PropType should have provider

    getInitialState() {
        return { value: '', valid: null, loading: false, typingTimer: null };
    },
    
    value() {
        return this.refs.input.value;
    },

    input() {
        return this.refs.input;
    },

    checkInputValue() {
        const component = this;
        const {input} = this.refs;
        const {provider} = this.props;

        // Only if input value is different
        if ( input.value !== this.state.value ) {
            if (provider) {
                let { videoExists, getID } = provider.Tools;
                videoExists(getID(input.value), {
                    loading() { component.setState({ valid: null,  loading: true }) },
                    success() { setTimeout(() => { component.setState({ valid: true,  loading: false }) }, 1200) },
                    error()   { setTimeout(() => { component.setState({ valid: false, loading: false }) }, 1200) }
                });
            }

            if (_.isEmpty(input.value)) {
                this.setState({ value: input.value, loading: false, valid: null });
            } else {
                this.setState({ value: input.value });
            }
        }
    },

    check(e) {
        clearTimeout(this.state.typingTimer);
        let typingTimer = setTimeout(this.checkInputValue, 500);
        this.setState({ typingTimer: typingTimer });
    },

    componentWillUpdate(newProps, newState) {
        //console.debug('Will Update', newProps, newState);
    },

    render() {
        console.log(this.state.loading);
        if (this.props.provider) {
            return (
                <span className="input-type-url">
                  <input ref="input"
                         type="text"
                         name={_.snakeCase(this.props.name)}
                         id={_.snakeCase(this.props.name)}
                         onChange={this.check}
                         className={`form-control ${this.props.className || ''}`}
                         placeholder={this.props.placeholder || ""} />

                  {this.state.loading ? <Spinner /> : '' }
                  {this.state.valid === true ? <Icon name="tick" explanation="Your video link is valid" /> : '' }
                  {this.state.valid === false ? <Icon name="cross" explanation="Video could not be found" /> : '' }
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
