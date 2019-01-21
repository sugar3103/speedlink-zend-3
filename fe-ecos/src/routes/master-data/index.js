import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Status from './status';

const MasterData = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/status`} />
          <Route path={`${match.url}/status`} component={Status} />
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default MasterData;