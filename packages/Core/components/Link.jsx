import React from 'react';
import _ from 'lodash';

export default React.createClass({
    propTypes: {
        for: React.PropTypes.string,
        href: React.PropTypes.string,
        data: React.PropTypes.object
    },
    render() {
        const route = FlowRouter.path(this.props.for, this.props.data || {});
        //const route = FlowRouter._routesMap[this.props.for]
        const href = route ? route.path : this.props.href || "";

        return (
            <a id={this.props.id} className={this.props.className} href={href}>{this.props.children}</a>
        );
    }
});
