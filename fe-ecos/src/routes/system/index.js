import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../crumb-route';

import User from './user';
import Setting from './setting';

const System = ({ match, intl: { messages } }) => (
  
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/user`} />
          <CrumbRoute title={messages['menu.setting']} path={`${match.url}/setting`} component={ Setting } />
          <CrumbRoute title={messages['menu.user']} path={`${match.url}/user`} component={ User } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(System);