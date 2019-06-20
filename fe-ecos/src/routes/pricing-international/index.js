import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../crumb-route';

// import Pricing from './pricing';
import RangeWeight from './range-weight';
import Zone from './zone';

const PricingInternational = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={match.url} to={`${match.url}/pricing`} />
          {/* <CrumbRoute title={messages['menu.pricing_index_international']} path={`${match.url}/pricing`} component={ Pricing } /> */}
          <CrumbRoute title={messages['menu.range_weight_international']} path={`${match.url}/range-weight`} component={ RangeWeight } />
          <CrumbRoute title={messages['menu.zone_international']} path={`${match.url}/zone`} component={ Zone } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(PricingInternational);