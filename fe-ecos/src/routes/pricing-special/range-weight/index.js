import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import CrumbRoute from '../../crumb-route';

import RangeWeight from './range_weight';
import ActionRangeWeight from '../../../components/PricingSpecial/RangeWeight/Action';
import RangeWeightImport from './import';

const RangeWeightIndex = ({ match, intl: { messages } }) => (
  <Fragment>
      <Switch>
            <Route exact path={match.url} component={ RangeWeight } />
            <CrumbRoute title={messages['menu.add']} path={`${match.url}/add`} render={() => <ActionRangeWeight type="add" />} />
            <CrumbRoute title={messages['menu.edit']} path={`${match.url}/edit/:id`} render={() => <ActionRangeWeight type="edit" />} />
            <CrumbRoute title={messages['menu.view']} path={`${match.url}/view/:id`} render={() => <ActionRangeWeight type="view" />} />
            <CrumbRoute title={messages['menu.import']} path={`${match.url}/import`} component={ RangeWeightImport } />
            
            <Redirect to="/page-not-found" />
      </Switch>
  </Fragment>
);
export default injectIntl(RangeWeightIndex);