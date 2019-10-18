import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import ZoneList from './list';
import ZoneImport from './import';

const Zone = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
            <Route exact path={match.url} component={ ZoneList } />
            <CrumbRoute title={messages['menu.import']} path={`${match.url}/import`} component={ ZoneImport } />
            <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(Zone);