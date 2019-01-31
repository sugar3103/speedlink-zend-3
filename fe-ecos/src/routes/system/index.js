import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import User from './user';
import Setting from './setting';

const System = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/user`} />
          <Route path={`${match.url}/setting`} component={Setting} />
          <Route path={`${match.url}/user`} component={User} />
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default System;