import React, { Component } from 'react';
import Logo from './Logo';
import Menu from './Menu';
import TopBarUser from './TopBarUser';
import Content from './Content';

class HomePage extends Component {

  render() {
    return (
      <div id="wrapper">

        {/* LEFT MENU */}
        <div className="left side-menu">
          <div className="slimscroll-menu" id="remove-scroll">
            <Logo />
            <Menu />
            <div className="clearfix"></div>
          </div>
        </div>

        {/* CONTENT PAGE */}
        <div className="content-page">
          <div className="topbar">
            <nav className="navbar-custom">
              <TopBarUser />
            </nav>
          </div>
          <Content>
            {this.props.children}
          </Content>
        </div>
      </div>
    );
  }
}

export default HomePage;