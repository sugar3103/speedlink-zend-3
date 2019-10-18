import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import Lists from './list';
import Role from './role';
import Permission from './permission';
import Edit from './edit';

const User = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
          <CrumbRoute title={messages['menu.user.list']} path={`${match.url}/list`} component={ Lists } />
          <CrumbRoute title={messages['menu.user.role']} path={`${match.url}/role`} component={ Role } />
          <CrumbRoute title={messages['menu.user.permission']} path={`${match.url}/permission`} component={ Permission } />
          <CrumbRoute title={messages['menu.edit']} path={`${match.url}/:id/edit`} component={ Edit } />
          <CrumbRoute title={messages['menu.user.profile']} path={`${match.url}/profile`} component={ Edit } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(User);