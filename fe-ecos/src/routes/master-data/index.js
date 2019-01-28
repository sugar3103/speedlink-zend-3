import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Status from './status';
import Address from './address';
import ServiceShipment from './service-shipment';

const MasterData = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/status`} />
          <Route path={`${match.url}/status`} component={Status} />
          <Route path={`${match.url}/address`} component={Address} />
          <Route path={`${match.url}/service-shipment`} component={ServiceShipment} />
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default MasterData;