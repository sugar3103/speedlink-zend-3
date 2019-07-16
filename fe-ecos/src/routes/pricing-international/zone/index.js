import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import ZoneIndex from './zone';
import ActionZone from '../../../components/PricingInternational/Zone/Action';

const Zone = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
            <Route exact path={match.url} component={ ZoneIndex } />
            <CrumbRoute title={messages['menu.add']} path={`${match.url}/add`} render={() => <ActionZone type="add" />} />
            <CrumbRoute title={messages['menu.edit']} path={`${match.url}/edit/:id`} render={() => <ActionZone type="edit" />} />
            <CrumbRoute title={messages['menu.view']} path={`${match.url}/view/:id`} render={() => <ActionZone type="view" />} />
            <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(Zone);