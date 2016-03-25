import React from 'react';
import NavProfile from '../containers/NavProfile.js'

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
                    //  > NewReplayButton
                </div>
            </section>
        </div>
    </header>
);

export default Header;
/*
   <header className="header">
   <div class="navbar-wrapper">
   <nav class="navbar">
   <ul class="menu">
   <li>
   <a href="#">
   <i class="icon icon-pin"></i><span class="icon-text">LEARN MORE</span>
   </a>
   </li>
   <li>
   <a href="#">
   <i class="icon icon-book"></i><span class="icon-text">RESOURCES</span>
   </a>
   </li>
   <li>
   <a href="#">
   <i class="icon icon-medias"></i><span class="icon-text">VODs</span>
   </a>
   </li>
   </ul>

   <ul class="user">
   //    {{ #if currentUser }}
   <li class="info">
   <a href="<!-- {{pathFor route='profile' username=currentUser.username}} -->">
   <img class="user-picture" src="/images/misc/mockup/ascensionfull.jpg">
   <span class="user-name">{{ currentUser.username }}</span>
   </a>
   </li>
   //    {{ / if }}
   <li class="align-middle">
   //    {{> UserAuthButtons}}
   </li>
   //    {{> notificationsDropdown }}
   </ul>
   </nav>
   </div>

   <div class="subnav-wrapper">
   <section class="subnav">
   <h1 class="logo">
   <img src="/images/logo.png">
   </h1>
   <div class="main-action">
   <a href="" class="post-replay">
   Help somebody <strong style="font-size: 1em;">&hearts;</strong>
   </a>
   //  {{> NewReplayButton}}
   </div>
   </section>
   </div>
   </header>
    </div>
   <ul className="user">
   {if (currentUser)}
   <li className="info">
   <a href="<!-- {{pathFor route='profile' username=currentUser.username}} -->">
   <img className="user-picture" src="/images/misc/mockup/ascensionfull.jpg" />
   <span className="user-name">currentUser.username</span>
   </a>
   </li>
   /*  endif 
<li className="align-middle">
//    > UserAuthButtons
</li>
//    > notificationsDropdown 
</ul>

*/

