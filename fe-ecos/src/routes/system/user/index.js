import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Lists from './list';
import Role from './role';
import Permission from './permission';
import Edit from './edit';

const User = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
          <Route path={`${match.url}/list`} component={Lists} />          
          <Route path={`${match.url}/role`} component={Role} />          
          <Route path={`${match.url}/permission`} component={Permission} />    
          <Route path={`${match.url}/:id/edit`} component={Edit} />
          <Route path={`${match.url}/profile`} component={Edit} />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default User;