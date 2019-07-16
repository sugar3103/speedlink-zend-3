import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import PricingIndex from './pricing';
import PricingDetail from './detail';

const Pricing = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
            <Route exact path={match.url} component={ PricingIndex } />
            <CrumbRoute title={messages['menu.add']} path={`${match.url}/add`} render={() => <PricingDetail type="add" />} />
            <CrumbRoute title={messages['menu.edit']} path={`${match.url}/edit/:id`} render={() => <PricingDetail type="edit" />} />
            <CrumbRoute title={messages['menu.view']} path={`${match.url}/view/:id`} render={() => <PricingDetail type="view" />} />
            <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(Pricing);