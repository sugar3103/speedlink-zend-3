import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RangeWeight from './rangeweight';
import ZoneCode from './zonecode';

const Pricing = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/rangeweight`} />
          <Route path={`${match.url}/rangeweight`} component={RangeWeight} />     
          <Route path={`${match.url}/zonecode`} component={ZoneCode} />          
          <Redirect to="/error" />
      </Switch>
  </Fragment>
);
export default Pricing;