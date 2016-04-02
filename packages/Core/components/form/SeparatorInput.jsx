import React from 'react';
import _ from 'lodash';

/*
 *  SeparatorInput Component
 *
 *    A component that allows you to handle multi-part input with separators such as 14/02/1991
 *
 *    Examples:
 *
 *      // Creates a 3 part input that must match the pattern, here we can have 14/02/1991 or 14/02/91 for instance
 *      <SeparatorInput type="separator" separator="/" pattern="\d{2}/\d{2}/\d{2,4}" name="birthday" />
 *      // Creates a 2 part input that must match the pattern, here we can 05:17 for instance
 *      <SeparatorInput type="separator" separator=":" pattern="\d{2}:\d{2}" name="time" />
 *      ...
 *
 */

export default React.createClass({
    propTypes: {
        type:      React.PropTypes.oneOf(["separator"]).isRequired,
        name:      React.PropTypes.string.isRequired,
        separator: React.PropTypes.string.isRequired, // The separator (must be the same as in the pattern)
        pattern:   React.PropTypes.string.isRequired, // A regexp as a string 
        value:     React.PropTypes.string // A value, will be split according to the pattern 
    },

    getInitialState() {
        return { values: [], outline: false };
    },

    value() {
        return this.state.values.join(this.props.separator);
    },

    valid() {
        const parts = this.parts();
        const validities = _.map(this.refs, (input) => {
            let id = parseInt(input.attributes["data-part"].value);
            return (new RegExp(parts[id])).test(input.value);
        });

        return !_.includes(validities, false);
    },

    input() {
        // Messy
        return this.refs;
    },

    parts() {
        return this.props.pattern.split(this.props.separator);
    },

    componentWillReceiveProps(newProps) {
        let valuesCount = this.parts().length;
        let pattern = new RegExp(this.props.pattern);

        // if has value and value is valid
        if (newProps.value && pattern.test(newProps.value)) {
            this.setState({ values: newProps.value.split(this.props.separator) });
        }
    },

    componentDidMount() {
        if (_.isEmpty(this.state.values)) {
            let valuesCount = this.parts().length;
            let pattern = new RegExp(this.props.pattern);

            // if has value and value is valid
            if (this.props.value && pattern.test(this.props.value)) {
                this.setState({ values: this.props.value.split(this.props.separator) });
            } else {
                // Create an empty array of valuesCount element
                this.setState({ values: Array.apply(null, Array(valuesCount)).map((v) => (v), null) });
            }
        } 
    },

    onFocus() {
        this.setState({ outline: true });
    },

    onBlur() {
        this.setState({ outline: false });        
    },

    onChange(e) {
        const el     = e.currentTarget;
        const parts  = this.parts();
        const partId = parseInt($(el).data('part'));
        const part   = parts[partId];
        const isLastPart = (partId == parts.length - 1);

        // If the length of the input is max and it's not the last input
        if (el.value.length >= this.inputDetailsFor(part).max && !isLastPart) {
            // focus the next input
            this.refs[`input-${partId + 1}`].focus();
        }

        let values = this.state.values;
        values[partId] = el.value;
        this.setState({ values });
    },

    inputDetailsFor(part) {
        // find them numbers
        let match = part.match(/\d/gi);
        if (match) {
            let min = match[0] ? match[0] : 1;
            let max = match[1] ? match[1] : min;

            return { min: parseInt(min) , max: parseInt(max) };
        }
    },

    render() {
        const parts = this.parts();

        const separator = (
            <span className="input-separator-item">
                {this.props.separator}
            </span>
        );

        const inputs = parts.map((part, i) => {
            const inputDetails = this.inputDetailsFor(part);
            let isLast = (i >= (parts.length - 1));
            let isFirst = (i == 0);
            let isMiddle = (!isLast && !isFirst);

            // 15 == ~character width
            const width = `${15 * inputDetails.max}px`;
            const inputStyles = { width, 'minWidth': '20px' };

            return (
                <li key={i} className={`${isLast ? 'last' : ''} ${isFirst ? 'first' : ''} ${isMiddle ? 'middle' : ''}`}>
                  <input ref={`input-${i}`}
                         type="text"
                         value={this.state.values[i]}
                         onChange={this.onChange}
                         onFocus={this.onFocus}
                         onBlur={this.onBlur}
                         data-part={i}
                         style={inputStyles}
                         name={_.snakeCase(this.props.name)}
                         minLength={inputDetails.min}
                         maxLength={inputDetails.max}
                         className={`separator-input ${this.props.className || ''}`}
                         placeholder={Array(inputDetails.max + 1).join("_")} />
                  {(isLast) ? '' : separator}
                </li>
            );
        });

        return (
            <ul className={`separator-input-container ${this.state.outline ? 'outlined' : '' }`}>
              {inputs}
            </ul>
        );
    }
});
