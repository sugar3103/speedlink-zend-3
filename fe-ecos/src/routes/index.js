import React, { Component, Fragment } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Layout from '../containers/Layout';
import Dashboards from './dashboards';
import MasterData from './master-data';
import System from './system';

class MainApp extends Component {

  render() {
    const { match } = this.props;
    return (
      <Fragment>
        <Layout />
        <div className="container__wrap">
          <Switch>
            <Route path={`${match.url}/dashboards`} component={Dashboards} />
            <Route path={`${match.url}/master-data`} component={MasterData} />
            <Route path={`${match.url}/system`} component={System} />
            <Redirect to="/error" />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(MainApp);