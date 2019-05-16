import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Carrier from './carrier';
import Service from './service';
import ShipmentType from './shipment-type';

const ServiceShipment = ({match}) => (
  <Fragment>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/service`} />
      <Route path={`${match.url}/carrier`} component={Carrier} />
      <Route path={`${match.url}/service`} component={Service} />
      <Route path={`${match.url}/shipment-type`} component={ShipmentType} />
      <Redirect to="/page-not-found" />
    </Switch>
  </Fragment>
);
export default ServiceShipment;