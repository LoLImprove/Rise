import React from 'react';
import ReplayView from './ReplayView.jsx';
import Analyses from '/client/modules/analyses/containers/Analyses.js';

const ReplayShow = React.createClass({
    render() {
        return (
            <span>
                <ReplayView {...this.props}>
                    <Analyses {...this.props} />
                </ReplayView>
            </span>
        );
    }
});

export default ReplayShow;
