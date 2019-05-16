import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Area from './area';
import Zone from './zone';
import RangeWeight from './range_weight';
import ActionRangeWeight from '../../components/PricingDomestic/RangeWeight/Action';

const PricingInternational = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}`} to={`${match.url}/pricing-domestic`} />
          <Route path={`${match.url}/area`} component={Area} />
          <Route path={`${match.url}/zone`} component={Zone} />
          <Route exact path={`${match.url}/range-weight`} component={RangeWeight} />
          <Route exact path={`${match.url}/range-weight/add`} component={ActionRangeWeight} />
          <Route exact path={`${match.url}/range-weight/edit/:id`} component={ActionRangeWeight} />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default PricingInternational;