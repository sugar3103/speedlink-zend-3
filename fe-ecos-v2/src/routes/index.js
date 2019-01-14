import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import createNotification from '../util/notifications';

import TopNav from '../containers/TopNav'
import Sidebar from '../containers/Sidebar';

import Dashboards from './dashboards';
import MasterData from './master-data';

import { connect } from 'react-redux';
import { alertClear } from '../redux/actions';
import PropTypes from 'prop-types';

class MainApp extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.alert) {
      createNotification(nextProps.alert);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.alert)
      this.props.alertClear();
  }

  render() {
    const { match, containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <NotificationContainer />
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
            <Switch>
              <Route path={`${match.url}/dashboards`} component={Dashboards} />
              <Route path={`${match.url}/master-data`} component={MasterData} />
              <Redirect to="/error" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

MainApp.propTypes = {
  containerClassnames: PropTypes.string.isRequired,
  alert: PropTypes.object,
  alertClear: PropTypes.func.isRequired
}

const mapStateToProps = ({ menu, alert }) => {
  const { containerClassnames } = menu;
  return { containerClassnames, alert };
}

export default withRouter(connect(mapStateToProps, {
  alertClear
})(MainApp));