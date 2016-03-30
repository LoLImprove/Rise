import React from 'react';
import NavProfile from '../containers/NavProfile.js';
import Core from 'meteor/rise:core';

const Link = Core.Components.Link;

const Header = () => (
    <header className="header">
        <div className="navbar-wrapper">
            <nav className="navbar">
                <ul className="menu">
                    <li>
                        <a href="#">
                            <i className="icon icon-pin"></i><span className="icon-text">LEARN MORE</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="icon icon-book"></i><span className="icon-text">RESOURCES</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="icon icon-medias"></i><span className="icon-text">VODs</span>
                        </a>
                    </li>
                </ul>

                <NavProfile />
            </nav>
        </div>

        <div className="subnav-wrapper">
            <section className="subnav">
                <h1 className="logo">
                    <a href="/"><img src="/images/logo.png" /></a>
                </h1>
                <div className="main-action">
                    <a href="" className="post-replay">
                        Help somebody <strong style={{"fontSize": "1em"}}>&hearts;</strong>
                    </a>
                    <Link for="replays:new" className="post-replay" >
                        Add your replay
                    </Link>
                </div>
            </section>
        </div>
    </header>
);

export default Header;

