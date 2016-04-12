import React from 'react';
import _ from 'lodash';

//import Core from 'meteor/rise:core';
//import { Auth } from '/client/composers/Auth.jsx';
import Analysis from './Analysis.jsx';

const Analyses = React.createClass({
    propTypes: {
        replayId: React.PropTypes.string.isRequired,
        replay: React.PropTypes.object,
        analyses: React.PropTypes.object,
        currentUserAnalysis: React.PropTypes.object
    },
    
    render() {
        const hasAnalyses = this.props.analyses.count() > 0;
        var currentUserAnalysis;
        console.log(hasAnalyses);

        if (this.props.currentUserAnalysis) {
            let props = { analysis: this.props.currentUserAnalysis, ...this.props };
            currentUserAnalysis = (
                <span>
                    <h3 className="analyses-title">My review</h3>
                    <Analysis {...props} />
                </span>
            );
        }

        const analysesList = this.props.analyses.map((analysis, index) => {
            let props = { key: index, analysis: analysis, ...this.props };
            return (<Analysis {...props} />);
        });

        return (
            <section className="analyses">
                <div className="analyses-container">
                    {currentUserAnalysis}
                </div>
                <div className="analyses-container">
                    <h3 className="analyses-title">Latest Reviews</h3>
                    {analysesList}
                </div>
            </section>
        );
    }
});

export default Analyses;
