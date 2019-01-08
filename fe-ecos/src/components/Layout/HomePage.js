import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';
import createNotification from '../../utils/notification';
import Logo from './Logo';
import Menu from './Menu';
import TopBarUser from './TopBarUser';
import Content from './Content';

class HomePage extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.alert) {
      createNotification(nextProps.alert);
    }
  }

  render() {
    return (
      <div id="wrapper">
        <NotificationContainer />
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

HomePage.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }).isRequired
}

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps, null)(HomePage);