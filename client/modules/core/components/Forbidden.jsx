import React from 'react';

export default React.createClass({
    render() {
        return (
            <div>
                <h1>Forbidden</h1>
                <p>{this.props.message || "You do not have access to this page"}</p>
            </div>
        );
    }
});
