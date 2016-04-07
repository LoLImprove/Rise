import React from 'react';
import Autosuggest from 'react-autosuggest';
import _ from 'lodash';

 /*
 *  Typeahead Component
 *
 *    Typeahead input, can also include pictures (must be 32x32) to display on the left of the input when a value is selected
 *
 *    Examples:
 *
 *      <Typeahead type="typeahead" name="champion" data={this.characters()} fullText={true} />
 *      <Typeahead type="typeahead" name="champion" data={this.characters()} withPicture={true} source={Game.lib.characterPicture} />
 *
 */
export default React.createClass({
    propTypes: {
        type:  React.PropTypes.oneOf(["typeahead"]).isRequired,
        name:  React.PropTypes.string.isRequired,
        data:  React.PropTypes.array.isRequired, // An array of objects with at least a name key e.g [{ name: "Ahri" }, { name: "Graves" }]
        value: React.PropTypes.string,
        onChange:    React.PropTypes.func,
        onFocus:     React.PropTypes.func,
        onBlur:      React.PropTypes.func,
        fullText:    React.PropTypes.bool, // Full text search
        withPicture: React.PropTypes.bool, 
        source:      React.PropTypes.func, // A function that will return the path to a picture being given the input value
        inputValue:  React.PropTypes.string, // What key of the data's objects are used as the value when the field is selected
        placeholder: React.PropTypes.string
    },

    getInitialState() {
        return {
            value: '',
            suggestions: this.getSuggestions(''),
            currentPicture: ''
        };
    },

    // Initialize the picture by calling the source with an empty value
    componentDidMount() {
        const value = _.isEmpty(this.state.value) ? (this.props.value || '') : this.state.value;

        if (this.props.value) {
            this.setState({ value: value });
        }

        if (this.props.withPicture) {
            this.setState({ currentPicture: this.props.source(value) });
        }

    },

    value() {
        return this.refs.inputContainer.input.value;
    },

    input() {
        return this.refs.inputContainer.input;
    },

    setCurrentPicture(value) {
        if (this.props.withPicture) {
            this.setState({ currentPicture: this.props.source(value) });
        }
    },

    // When suggestion selected
    getSuggestionValue(suggestion) { 
        let valueKey = this.props.inputValue || "name";
        let value = suggestion[valueKey];

        this.setCurrentPicture(value);

        return value;
    },

    getSuggestions(value) {
        const inputValue  = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const data        = this.props.data || [];

        if (inputLength === 0) {
            return [];
        } else {
            if (this.props.fullText) {
                return data.filter(suggestion =>
                    (new RegExp(`${inputValue}`, "i")).test(suggestion.name)
                );
            } else {
                return data.filter(suggestion =>
                    suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
                );

            }
        }
    },


    renderSuggestion(suggestion) {
        var parts = [];

        if (this.props.fullText)  {
            parts = suggestion.name.split(RegExp(`(${this.state.value})`, "i"));
        } else {
            parts = suggestion.name.split(RegExp(`^(${this.state.value})`, "i"));
        }

        if (parts.length > 2) {
            return (
                <span>{parts[0]}<strong>{parts[1]}</strong>{parts[2]}</span>
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

    onChange(e, { newValue }) {
        this.setState({ value: newValue });
        if (this.props.onChange) {
            this.props.onChange(e, { newValue });
        }
    },

    onBlur(e) {
        const inputValue = e.currentTarget.value;
        let suggestion = _.find(this.getSuggestions(inputValue), { name: inputValue });

        if (!suggestion) {
            suggestion = this.getSuggestions(inputValue)[0];
        }
        const value = (suggestion && suggestion.name) || inputValue;

        this.setCurrentPicture(value);
        this.setState({ value: value, suggestions: [] });

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    },

    onFocus(e) {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    },

    render() {
        const { value, suggestions, currentPicture } = this.state;

        if (this.props.withPicture) {
            var picture = (
                <span className="matching-picture">
                    <img src={currentPicture} alt={value} />
                </span>
            );
        }

        const inputProps = {
            id: _.snakeCase(this.props.name),
            className: `form-control ${this.props.className || ''}`,
            type: 'text',
            value: value,
            placeholder: this.props.placeholder || "",
            onChange: this.onChange, 
            onBlur: this.onBlur,
            onFocus: this.onFocus
        };

        return (
            <span className={`typeahead-container ${this.props.withPicture ? 'has-picture' : '' }`}>
              <Autosuggest suggestions={suggestions}
                           ref="inputContainer"
                           onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                           getSuggestionValue={this.getSuggestionValue}
                           renderSuggestion={this.renderSuggestion}
                           inputProps={inputProps} />

              {this.props.withPicture ? picture : ''}
            </span>
        );
    }
});
