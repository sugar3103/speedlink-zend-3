import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RangeWeight from './rangeweight';
import ZoneCode from './zonecode';
import Management from './management';

const Pricing = ({ match }) => (
  <Fragment>
      <Switch>
          <Route exact from={`${match.url}/`} component={Management} />
          <Route path={`${match.url}/rangeweight`} component={RangeWeight} />     
          <Route path={`${match.url}/zonecode`} component={ZoneCode} />          
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default Pricing;