import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

const menus = [
  {
    name: 'Dashboard',
    to: '/',
    exact: true,
    icon: 'fi-air-play',
    children: []
  },
  {
    name: 'Master Data',
    to: '',
    icon: 'fi-layers',
    exact: false,
    children: [
      {
        name: 'Status',
        to: '/status',
        exact: false
      },
      {
        name: 'Address',
        to: '/address',
        exact: false
      }
    ]
  }
];

const MenuLink = ({ label, to, icon, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        var active = match ? 'active' : '';
        return (
          <li className={active}>
            <Link to={to} className={active}>
              {icon && <i className={icon} />}
              {label}
            </Link>
          </li>
        )
      }}
    />
  )
}



class Menu extends Component {

  showChildrenMenu = (children) => {
    return children.map((item, index) => {
      return (
        <MenuLink
          key={index}
          label={item.name}
          to={item.to}
          activeOnlyWhenExact={item.exact}
        />
      )
    });
  }

  showMenu = (menus) => {
    var result = null;
    if (menus.length > 0) {

      result = menus.map((menu, index) => {
        if (menu.children.length > 0) {
          return (
            <li key={index}>
            {/* eslint-disable-next-line */}
            <a href="javascript: void(0);"><i className={menu.icon} /> <span> {menu.name}</span> <span className="menu-arrow" /></a>
              <ul className="nav-second-level" aria-expanded="false">
                {this.showChildrenMenu(menu.children)}
              </ul>
            </li>
          )
        } else {
          return (
            <MenuLink
              key={index}
              label={menu.name}
              icon={menu.icon}
              to={menu.to}
              activeOnlyWhenExact={menu.exact}
            />
          )
        }
      });
    }

    return result;
  }

  render() {
    return (
      <div id="sidebar-menu">
        <ul className="metismenu" id="side-menu">
          {this.showMenu(menus)}
        </ul>
      </div>
    );
  }
};

export default withRouter(Menu);