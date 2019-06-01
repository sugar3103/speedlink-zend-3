import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import CrumbRoute from '../crumb-route';
import { injectIntl } from 'react-intl';

import Status from './status';
import Address from './address';
import ServiceShipment from './service-shipment';
import Networkport from './networkport';

const MasterData = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/status`} />
          <CrumbRoute exact title={messages['menu.status']} path={`${match.url}/status`} component={ Status } />
          <CrumbRoute title={messages['menu.address']} path={`${match.url}/address`} component={ Address } />
          <CrumbRoute title={messages['menu.customer_service']} path={`${match.url}/service-shipment`} component={ ServiceShipment } />
          <CrumbRoute title={messages['menu.network_port']} path={`${match.url}/networkport`} component={ Networkport } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(MasterData);