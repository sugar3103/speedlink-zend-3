import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import status from './status';
import address from './address';

const Status = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/status`} />
            <Route path={`${match.url}/status`} component={status} />
            <Route path={`${match.url}/address`} component={address} />
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default Status;