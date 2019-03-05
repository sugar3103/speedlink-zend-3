import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Branch from './branch';
import Hub from './hub';

const NetworkPort = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/hub`} />
          <Route path={`${match.url}/hub`} component={Hub} />  
          <Route path={`${match.url}/branch`} component={Branch} />           
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default NetworkPort;