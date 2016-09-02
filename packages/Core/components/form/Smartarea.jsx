import React from 'react';
import DOM from 'react-dom';
import _ from 'lodash';
import Animate from '../../composers/Animate.jsx';
import OutsideClickEvent from 'react-onclickoutside';
import Textarea from 'react-textarea-autosize';

import Icon from '../Icon.jsx';
/*
 *  Smartarea Component
 *
 *    Textarea on steroid. Features:
 *      - Autoresize according to content (through minRows and maxRows props)
 *      - 2 themes, blue and green but you can add more through CSS
 *      - A Full option, where the textarea will take all the space available to it
 *      - A Submit Mode where you can directly submit the textarea using the 'Enter' key or Submit button
 *        In Submit Mode you need to use 'Shift + Enter' to add a new line
 *      - A formatting help that allows you to click on the help sections to add markdown to your textarea
 *
 *    Examples:
 *
 *      <Smartarea type="smartarea" name="description" full={true} theme="green" canSubmit={false} value="Something" />
 *
 *      <Smartarea type="smartarea" name="description" full={true} theme="green" canSubmit={true} onSubmit={this.textareaSubmit} />
 *
 */

const Smartarea = React.createClass({
    propTypes: {
        type:      React.PropTypes.oneOf(["smartarea"]).isRequired,
        name:      React.PropTypes.string.isRequired,
        value:     React.PropTypes.string,
        disabled:  React.PropTypes.bool,
        style:     React.PropTypes.object,
        minRows:   React.PropTypes.number,
        maxRows:   React.PropTypes.number,
        full:      React.PropTypes.bool,
        theme:     React.PropTypes.string, // blue or green
        canSubmit: React.PropTypes.bool, // Submit mode or not, if true, Shift + Enter adds a new line and Enter submits
        onSubmit:  React.PropTypes.func, // Triggers only if canSubmit is true and on submit
        onChange:  React.PropTypes.func, 
        onFocus:   React.PropTypes.func, 
        onBlur:    React.PropTypes.func, 
        onClick:   React.PropTypes.func, 
        placeholder:  React.PropTypes.string
    },

    mixins: [OutsideClickEvent],

    getInitialState() {
        return { value: null, error: null, active: false, showHelp: false, caretPosition: null };
    },

    getDefaultProps: function() {
        return {
            disabled: false,
            canSubmit: true,
            minRows: 2,
            maxRows: 20,
            full: false,
            theme: 'blue',
            value: ''
        };
    },

    value() {
        return this.refs.input.value;
    },

    input() {
        return this.refs.input;
    },

    inputNode() {
        return $(DOM.findDOMNode(this)).find('textarea')[0];
    },

    clear() {
        this.setState({ value: "" });
    },

    focus() {
        this.setState({ active: true});
        this.refs.input.focus();
    },

    setError(error) {
        this.setState({ error: error });
    },

    clearError() {
        this.setState({ error: null });
    },

    componentDidMount() {
        if (this.props.value && !_.isEmpty(this.props.value)) {
            this.setState({ value: this.props.value });
        }
    },

    componentDidUpdate(props, state) {
        if (this.state.caretPosition) {
            this.setCaretPosition(this.inputNode());
            this.setState({ caretPosition: null });
        }
    },

    toggleHelp(e) {
        if (!this.state.showHelp) {
            this.setState({ showHelp: !this.state.showHelp });
            this.animator.visibility.slideDown(this);
        } else {
            this.animator.visibility.slideUp(this, 500, () => {
                this.setState({ showHelp: !this.state.showHelp });
            });
        }
    },


    onChange(e) {
        this.setState({ value: this.refs.input.value });
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    onFocus(e) {
        this.setState({ active: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }

    },

    onBlur(e) {
        this.setState({ active: false, showHelp: false, error: null });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    },

    onClick(e) {
        if (!this.state.active) {
            this.setState({ active: true });
        }
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    },

    handleClickOutside(e) {
        this.onBlur(e);
    },

    onSpecialKeyPress(e) {
        if (e.key === "Enter" && this.props.canSubmit) {
            e.preventDefault();
            if (e.shiftKey) {
                this.addNewLine(e);
            } else {
                this.onSubmit(e);
            }
        } 
    },


    onSubmit(e) {
        if (this.props.canSubmit) {
            if (this.props.onSubmit) {
                this.props.onSubmit(e);
            }
        }
    },

    addNewLine(e) {
        this.insertTextAtCaret("\n");
    },

    insertTextAtCaret(text, e) {
        const input = this.inputNode();
        let value   = (this.state.value || "");

        if (_.isEmpty(value)) {
            value = value + text;
        } else {
            let firstPart = value.slice(0, input.selectionStart);
            let lastPart =  value.slice(input.selectionStart, value.length);

            (input.selectionStart === input.selectionEnd) ? firstPart += text : lastPart = text + lastPart;

            value = firstPart + lastPart;
        }

        this.setState({ value: value, caretPosition: input.selectionStart + text.length });
    },

    setCaretPosition(elem) {
        const caretPos = this.state.caretPosition;

        if (!this.state.caretPosition) return;

        if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else if (elem.selectionStart !== undefined) {
            elem.focus();
            elem.setSelectionRange(caretPos, caretPos);
        }
    },

    addTag(e) {
        var text = $(e.currentTarget).find('.markup').text();
        var value = ` ${text} `;

        // Man that's disgusting but I am a bit tired
        // The idea is the if we have the list (which is multiline) we split on the * and add them back before joining with \n
        if ($(e.currentTarget).hasClass('list')) {
            let items = text.split("*");
            text = items.slice(1, items.length).map((v) => ( "*" + v)).join("\n");

            value = `\n${text}\n`;
        } 
        this.insertTextAtCaret(value, e);
    },

    render() {
        const submitButton = (
            <span className="comment-submit feather" onClick={this.onSubmit}>
                <Icon name="big-feather" />
            </span>
        );

        if (this.props.canSubmit) {
            if (this.state.error) {
                var help = (
                    <ul className="help">
                      <li className="smartarea-error">
                        {this.state.error}
                      </li>
                    </ul>
                );
            } else {
                var help = (
                    <ul className="help">
                        <li>
                            <span className="icon-text help-title">Help :</span>
                            <span className="help-new-line" onClick={this.addNewLine}>
                                <Icon name={`shift-enter-${this.props.theme}`}>New Line</Icon>
                            </span>
                        </li>
                        <li>
                            <Icon name={`enter-${this.props.theme}`}>Submit</Icon>
                        </li>
                        <li className="info" onClick={this.toggleHelp}>
                            <Icon name={`info-${this.props.theme}`}>Formatting help</Icon>
                        </li>
                    </ul>
                );
            }
        } else {
            var help = (
                <ul className="help">
                    <li className="info" onClick={this.toggleHelp}>
                        <Icon name={`info-${this.props.theme}`}>Formatting help</Icon>
                    </li>
                </ul>
            );
        }

        const fullHelp = (
            <div style={this.animator.stylesFor('visibility', this)} className="smart-area-help">
                <ul className="full-help-list">
                    <li className="column" onClick={this.addTag}>
                        <span className="markup">*italics*</span>
                        <span className="rendering"><em>italics</em></span>
                    </li>
                    <li className="column" onClick={this.addTag}>
                        <span className="markup">**bold**</span>
                        <span className="rendering"><strong>bold</strong></span>
                    </li>
                    <li className="column" onClick={this.addTag}>
                        <span className="markup">@00:01</span>
                        <span className="rendering"><a className="time-ref" href="#">00:01</a></span>
                    </li>
                    <li className="column list" onClick={this.addTag}>
                        <span className="markup">* item 1<br />* item 2<br />* item 3</span>
                        <span className="rendering">
                            <ul>
                                <li>&bull; item 1</li>
                                <li>&bull; item 2</li>
                                <li>&bull; item 3</li>
                            </ul>
                        </span>
                    </li>
                    <li className="column quote" onClick={this.addTag}>
                        <span className="markup">&gt; Quote</span>
                        <span className="rendering"><blockquote>Quote</blockquote></span>
                    </li>
                    <li className="column stroke" onClick={this.addTag}>
                        <span className="markup">~~strike~~</span>
                        <span className="rendering"><strike>strike</strike></span>
                    </li>
                </ul>
            </div>
        );

        return (
            <div className={`smart-area ${(this.state.active && !this.props.disabled) ? 'active' : ''} ${this.props.theme} ${this.props.full ? 'full' : ''} ${this.state.showHelp ? 'full-help' : ''} ${this.state.error ? 'error' : ''}`}>
                <div className="area-field">
                    <Textarea value={this.state.value}
                              minRows={this.props.minRows}
                              maxRows={this.props.maxRows}
                              style={this.props.style}
                              onChange={this.onChange}
                              onFocus={this.onFocus}
                              onClick={this.onClick}
                              onKeyPress={this.onSpecialKeyPress}
                              onKeyDown={this.onKeyDown}
                              disabled={this.props.disabled}
                              ref="input"
                              name={_.snakeCase(this.props.name)}
                              id={_.snakeCase(this.props.name)}
                              className={`smart-area-textarea ${this.props.className || ''}`}
                              placeholder={this.props.placeholder || ""}></Textarea>

                    {this.props.canSubmit && !this.props.disabled ? submitButton : ''}
                    {this.state.active && !this.props.disabled ? help : '' }
                </div>

                {this.state.showHelp ? fullHelp : '' }
            </div> 
        );
    }
});

export default Animate.extend(Smartarea);

/*
 */
