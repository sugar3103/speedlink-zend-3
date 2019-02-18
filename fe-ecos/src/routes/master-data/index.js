import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Status from './status';
import Address from './address';
import ServiceShipment from './service-shipment';
import Networkport from './networkport';
import Pricing from './pricing';

const MasterData = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/status`} />
          <Route exact path={`${match.url}/status`} component={Status} />
          <Route path={`${match.url}/address`} component={Address} />
          <Route path={`${match.url}/service-shipment`} component={ServiceShipment} />
          <Route path={`${match.url}/networkport`} component={Networkport} />
          <Route path={`${match.url}/pricing`} component={Pricing} />
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default MasterData;