import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default React.createClass({
    iconMap: {
        'tick': '&#10004;',
        'bang': '!',
        'cross': '&#10008;'
    },

    icon() {
        return { __html: this.iconMap[this.props.name] };
    },

    render() {
        const tooltip = (
            <Tooltip className="in" id={`icon-${this.props.name}`}>
                <div className="explanation">{this.props.explanation}</div>
            </Tooltip>
        );

        if (this.props.explanation) {
            return (
                <OverlayTrigger placement="right" overlay={tooltip}>
                    <span className="icon-component">
                        <span className={this.props.name} dangerouslySetInnerHTML={this.icon()} />
                    </span>
                </OverlayTrigger>
            );
        } else {
            return (
                <span className="icon-component">
                    <span className={this.props.name} dangerouslySetInnerHTML={this.icon()} />
                </span>
            );
        }

    }
});
