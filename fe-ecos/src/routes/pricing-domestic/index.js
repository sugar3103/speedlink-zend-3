import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../crumb-route';

import Pricing from './pricing';
import Area from './area';
import Zone from './zone';
import RangeWeight from './range-weight';

const PricingDomestic = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={match.url} to={`${match.url}/pricing`} />
          <CrumbRoute title={messages['menu.pricing_index_domestic']} path={`${match.url}/pricing`} component={ Pricing } />
          <CrumbRoute title={messages['menu.area_domestic']} path={`${match.url}/area`} component={ Area } />
          <CrumbRoute title={messages['menu.zone_domestic']} path={`${match.url}/zone`} component={ Zone } />
          <CrumbRoute title={messages['menu.range_weight_domestic']} path={`${match.url}/range-weight`} component={ RangeWeight } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(PricingDomestic);