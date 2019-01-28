import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import code from './code';
import country from './country';
import city from './city';
import district from './district';

const Address = ({ match }) => (
    // <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/code`} />
            <Route path={`${match.url}/code`} component={code} />
            <Route path={`${match.url}/country`} component={country} />
            <Route path={`${match.url}/city`} component={city} />
            <Route path={`${match.url}/district`} component={district} />
            <Redirect to="/error" />
        </Switch>
    // </div>
);
export default Address;