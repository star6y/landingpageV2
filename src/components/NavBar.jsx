import React from 'react';
import { Link } from 'react-router-dom';
import { IoHome, IoPerson, IoFolderOpenOutline } from 'react-icons/io5';

import DarkModeToggle from './DarkMode';
// import 'bulma/css/bulma.min.css';
import '../static/css/nav.css';


const NavBar = () => {
  return (
    <nav className="nav">
      <div className="navbar-container">
        <div className="side left-side"></div>

        <div className="navbar-flex">
          <Link className="item" to="/">
            <IoHome className="icon-mobile" size={24} />
            <span className="text-desktop">Home</span>
          </Link>
          <Link className="item" to="/aboutme">
            <IoPerson className="icon-mobile" size={24} />
            <span className="text-desktop">About Me</span>
          </Link>
          <Link className="item" to="/projects">
            <IoFolderOpenOutline className="icon-mobile" size={24} />
            <span className="text-desktop">Projects</span>
          </Link>
          <div className='toggle-hidden item'>
            <DarkModeToggle />
          </div>
        </div>
        <div className="navbar-item  side">
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar;



// <nav className="navbar">
//      <div className="container navbar-container">
//        <div className="takeSpace"></div>
//
//        <div className="navbar-menu is-active navbar-flex">
//          <Link className="navbar-item link" to="/">
//            <IoHome className="icon-mobile" size={24} />
//            <span className="text-desktop">Home</span>
//          </Link>
//          <Link className="navbar-item link" to="/aboutme">
//            <IoPerson className="icon-mobile" size={24} />
//            <span className="text-desktop">About Me</span>
//          </Link>
//          <Link className="navbar-item link" to="/projects">
//            <IoFolderOpenOutline className="icon-mobile" size={24} />
//            <span className="text-desktop">Projects</span>
//          </Link>
//        </div>
//        <div className="navbar-item toggle">
//          <DarkModeToggle />
//        </div>
//      </div>
//    </nav>