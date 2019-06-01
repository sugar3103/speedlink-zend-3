import React, { Component, Fragment } from 'react';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import Layout from '../containers/Layout';
import Dashboards from './dashboards';
import MasterData from './master-data';
import PricingDomestic from './pricing-domestic';
import PricingInternational from './pricing-management';
import System from './system';
import CrumbRoute from './crumb-route';

class MainApp extends Component {

  render() {
    const { match, intl: { messages } } = this.props;
    return (
      <Fragment>
        <Layout />
        <div className="container__wrap">
          <Switch>
            <CrumbRoute title={messages['menu.dashboard']} path={`${match.url}dashboards`} component={ Dashboards } />
            <CrumbRoute title={messages['menu.master-data']} path={`${match.url}master-data`} component={ MasterData } />
            <CrumbRoute title={messages['menu.pricing_domestic']} path={`${match.url}pricing-domestic`} component={ PricingDomestic } />
            <CrumbRoute title={messages['menu.pricing_international']} path={`${match.url}pricing-international`} component={ PricingInternational } />
            <CrumbRoute title={messages['menu.system']} path={`${match.url}system`} component={ System } />
            <Redirect to="/page-not-found" />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(injectIntl(MainApp));