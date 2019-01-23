import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Lists from './list';
import Role from './role';
import Permisson from './permisson';

const User = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
          <Route path={`${match.url}/list`} component={Lists} />          
          <Route path={`${match.url}/role`} component={Role} />          
          <Route path={`${match.url}/permisson`} component={Permisson} />          
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default User;