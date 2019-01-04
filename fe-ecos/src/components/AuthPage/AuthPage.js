import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import createNotification from '../../utils/notification';
import { connect } from 'react-redux';
import Panel from './Panel';
import Content from './Content';

class AuthPage extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.alert) {
      createNotification(nextProps.alert);
    }
  }

  render() {
    return (
      <div className="account-pages">
        <Panel />
        <Content>
          <NotificationContainer />
          {this.props.children}
        </Content>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps, null)(AuthPage);