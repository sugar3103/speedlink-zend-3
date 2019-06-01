import React, { Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import Code from './code';
import Country from './country';
import City from './city';
import District from './district';
import Ward from './ward';


const MasterData = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/code`} />
          <CrumbRoute title={messages['menu.address_code']} path={`${match.url}/code`} component={ Code } />
          <CrumbRoute title={messages['menu.address_country']} path={`${match.url}/country`} component={ Country } />
          <CrumbRoute title={messages['menu.address_city']} path={`${match.url}/city`} component={ City } />
          <CrumbRoute title={messages['menu.address_district']} path={`${match.url}/district`} component={ District } />
          <CrumbRoute title={messages['menu.address_ward']} path={`${match.url}/ward`} component={ Ward } />
          <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(MasterData);