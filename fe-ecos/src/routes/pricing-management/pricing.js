import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PricingIndex from './pricing/index';
import PricingDetail from './pricing/detail';

const PricingManagement = ({ match }) => (
  <Fragment>
      <Switch>
          <Route exact path={`${match.url}` || `${match.url}/`} component={PricingIndex} />
          <Route exact path={`${match.url}/add`} render={() => <PricingDetail type="add" />} />     
          <Route exact path={`${match.url}/edit/:id`} render={() => <PricingDetail type="edit" />} />     
          <Route exact path={`${match.url}/view/:id`} render={() => <PricingDetail type="view" />} />     
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default PricingManagement;