import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RangeWeight from './range-weight';
import ZoneCode from './zone-code';
import Pricing from './pricing';

const PricingManagement = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/pricing`} />
          <Route path={`${match.url}/pricing`} component={Pricing} />
          <Route path={`${match.url}/range-weight`} component={RangeWeight} />     
          <Route path={`${match.url}/zone-code`} component={ZoneCode} />          
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default PricingManagement;