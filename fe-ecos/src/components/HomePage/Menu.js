import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu" id="side-menu">
        <li>
          <Link to="/">
            <i className="fi-air-play" /><span className="badge badge-danger badge-pill float-right">7</span> <span> Dashboard </span>
          </Link>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <a href="javascript: void(0);"><i className="fi-layers" /> <span> Master Data </span> <span className="menu-arrow" /></a>
          <ul className="nav-second-level" aria-expanded="false">
            <li><Link to="/status">Status</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;