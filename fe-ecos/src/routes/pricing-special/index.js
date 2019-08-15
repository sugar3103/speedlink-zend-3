import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../crumb-route';

import Area from './area';
import Zone from './zone';
import RangeWeight from './range-weight';
import Pricing from './pricing';

const PricingDomestic = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={match.url} to={`${match.url}/pricing`} />
          <CrumbRoute title={messages['menu.pricing_index_special']} path={`${match.url}/pricing`} component={ Pricing } />
          <CrumbRoute title={messages['menu.area_special']} path={`${match.url}/area`} component={ Area } />
          <CrumbRoute title={messages['menu.zone_special']} path={`${match.url}/zone`} component={ Zone } />
          <CrumbRoute title={messages['menu.range_weight_special']} path={`${match.url}/range-weight`} component={ RangeWeight } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(PricingDomestic);