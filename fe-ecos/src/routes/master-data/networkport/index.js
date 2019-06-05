import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import Branch from './branch';
import Hub from './hub';

const NetworkPort = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/hub`} />
          <CrumbRoute title={messages['menu.hub']} path={`${match.url}/hub`} component={ Hub } />
          <CrumbRoute title={messages['menu.branch']} path={`${match.url}/branch`} component={ Branch } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(NetworkPort);