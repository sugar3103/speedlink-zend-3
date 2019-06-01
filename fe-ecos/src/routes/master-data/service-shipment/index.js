import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import Carrier from './carrier';
import Service from './service';
import ShipmentType from './shipment-type';

const ServiceShipment = ({ match, intl: { messages } }) => (
  <Fragment>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/carrier`} />
      <CrumbRoute title={messages['menu.cs_carrier']} path={`${match.url}/carrier`} component={ Carrier } />
      <CrumbRoute title={messages['menu.cs_service']} path={`${match.url}/service`} component={ Service } />
      <CrumbRoute title={messages['menu.cs_shipment_type']} path={`${match.url}/shipment-type`} component={ ShipmentType } />
      <Redirect to="/page-not-found" />
    </Switch>
  </Fragment>
);
export default injectIntl(ServiceShipment);