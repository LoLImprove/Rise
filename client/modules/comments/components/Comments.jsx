import React from 'react';
import MarkDown from 'react-markdown';
import _ from 'lodash';

import Core from 'meteor/rise:core';

import Animate from '/client/composers/Animate.jsx';
import { Auth } from '/client/composers/Auth.jsx';

const Icon = Core.Components.Icon;
const Link = Core.Components.Link;

const Comments = React.createClass({
    render() {
        return (
            <span>Comments
                <ul className="analysis-comments height-animate">
                    <li>Comment</li>
                </ul>
                Form
            </span>
        );
    }
});

export default Comments;
