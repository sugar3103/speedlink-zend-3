import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Code from './code';
import Country from './country';
import City from './city';
import District from './district';
import Ward from './ward';


const MasterData = ({ match }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/code`} />
          <Route path={`${match.url}/code`} component={Code} />          
          <Route path={`${match.url}/country`} component={Country} />          
          <Route path={`${match.url}/city`} component={City} />          
          <Route path={`${match.url}/district`} component={District} />          
          <Route path={`${match.url}/ward`} component={Ward} />          
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default MasterData;