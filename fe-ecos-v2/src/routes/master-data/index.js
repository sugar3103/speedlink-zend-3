import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import status from './status';

const Status = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/status`} />
            <Route path={`${match.url}/status`} component={status} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default Status;