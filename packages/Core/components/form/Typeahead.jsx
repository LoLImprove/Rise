import React from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';

export default React.createClass({
    getInitialState() {
        return {
            value: '',
            suggestions: this.getSuggestions('')
        };
    },

    value() {
        return this.refs.inputContainer.input.value;
    },

    input() {
        return this.refs.inputContainer.input;
    },

    // When suggestion selected, this function tells
    getSuggestionValue(suggestion) { 
        let valueKey = this.props.inputValue || "name";
        // What should be the value of the input
        return suggestion[valueKey];
    },

    getSuggestions(value) {
        const inputValue  = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const data        = this.props.data || [];

        if (inputLength === 0) {
            return [];
        } else {
            return data.filter(suggestion =>
                suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
            );
        }
    },


    renderSuggestion(suggestion) {
        let parts = suggestion.name.split(RegExp(`^(${this.state.value})`, "i"));

        if (parts.length > 2) {
            return (
                <span><strong>{parts[1]}</strong>{parts[2]}</span>
            );
        } else {
            return (
                <span>{suggestion.name}</span>
            );
        }
    },

    onSuggestionsUpdateRequested({ value, reason }) {
        this.setState({ suggestions: this.getSuggestions(value) });
    },

    onChange(event, { newValue }) {
        this.setState({ value: newValue });
    },

    onBlur(event) {
        const inputValue = event.currentTarget.value;
        let suggestion = _.find(this.getSuggestions(inputValue), { name: inputValue });

        if (!suggestion) {
            suggestion = this.getSuggestions(inputValue)[0];
        }
        const value = (suggestion && suggestion.name) || inputValue;

        this.setState({ value: value, suggestions: [] });
    },

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            id: _.snakeCase(this.props.name),
            className: `form-control ${this.props.className || ''}`,
            type: 'text',
            value: value,
            placeholder: this.props.placeholder || "",
            onChange: this.onChange, 
            onBlur: this.onBlur,
            onFocus: this.onFocus,
        };

        return (
            <Autosuggest suggestions={suggestions}
                         ref={"inputContainer"}
                         onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                         getSuggestionValue={this.getSuggestionValue}
                         renderSuggestion={this.renderSuggestion}
                         inputProps={inputProps} />
        );
    }
});
