import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RangeWeight from './range-weight';
import ZoneCode from './zone-code';
import Management from './management';

const Pricing = ({ match }) => (
  <Fragment>
      <Switch>
          <Route exact from={`${match.url}/`} component={Management} />
          <Route path={`${match.url}/range-weight`} component={RangeWeight} />     
          <Route path={`${match.url}/zone-code`} component={ZoneCode} />          
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default Pricing;