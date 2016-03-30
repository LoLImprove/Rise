import React from 'react';
import _ from 'lodash';

export default React.createClass({
    render() {
        const route = FlowRouter._routesMap[this.props.for]
        const href = route ? route.path : this.props.href || "";

        return (
            <a id={this.props.id} className={this.props.className} href={href}>{this.props.children}</a>
        );
    }
});
