import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default React.createClass({
    propTypes: {
        type: React.PropTypes.string,
        name: React.PropTypes.string.isRequired, // Either text or null, null for css based, text for text based icon (see iconMap)
        // children: React.PropTypes.element, // Some html to add next to the icon
        childPosition: React.PropTypes.string, // right or Left
        explanation: React.PropTypes.string, // Adds a tooltip explanation on hover
        onClick: React.PropTypes.func
    },

    iconMap: {
        'tick': '&#10004;',
        'bang': '!',
        'cross': '&#10008;'
    },

    iconFromText() {
        return { __html: this.iconMap[this.props.name] };
    },

    render() {
        const childPosition = this.props.childPosition || "right";

        const tooltip = (
            <Tooltip className="in" id={`icon-${this.props.name}`}>
                <div className="explanation">{this.props.explanation}</div>
            </Tooltip>
        );

        var text = '';
        if (this.props.children) {
            text = <span className={`icon-text ${this.props.name}-text`}>{this.props.children}</span>;
        }

        if (this.props.type === "text") {
            var icon = (
                <span className={`icon-component type-text ${this.props.children ? 'has-text' : ''}`} onClick={this.props.onClick}>
                    {childPosition == "left" ? text : ''}
                    <span className={`icon ${this.props.name}`} dangerouslySetInnerHTML={this.iconFromText()} />
                    {childPosition == "right" ? text : ''}
                </span>
            );
        } else {
            var icon = (
                <span className={`icon-component ${this.props.name} type-base ${this.props.children ? 'has-text' : ''}`} onClick={this.props.onClick}>
                    {childPosition == "left" ? text : ''}
                    <i className={`icon icon-${this.props.name}`}></i>
                    {childPosition == "right" ? text : ''}
                </span>
            );
        }

        if (this.props.explanation) {
            return (
                <OverlayTrigger placement="right" overlay={tooltip}>
                    {icon}
                </OverlayTrigger>
            );
        } else {
            return icon;
        }

    }
});
