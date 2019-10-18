import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { NotificationContainer } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import { defaultStartPath } from '../../constants/defaultValues';
import { connect } from "react-redux";

import AppLocale from '../../lang';
import MainRoute from '../../routes';

import MainWrapper from './MainWrapper';
import Login from '../../routes/auth/login';
import NotFound from '../../components/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('authUser')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !localStorage.getItem('authUser')
        ? <Component {...props} />
        : <Redirect to="/" />
  )} />
);

class Router extends Component {
  render() {
    const { location, match, locale } = this.props;
    
    const currentAppLocale = AppLocale[locale];
    if (location.pathname === null || location.pathname === '/') {
      return (<Redirect to={defaultStartPath} />);
    }
    return (
      <Fragment>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <MainWrapper>
            <main>
            <NotificationContainer />
              <Switch>
                <PublicRoute exact path={`/login`} component={Login} />
                <Route exact path="/page-not-found" component={NotFound} />
                <PrivateRoute path={`${match.url}`} component={MainRoute} />
              </Switch>
            </main>
          </MainWrapper>
        </IntlProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {  
  const { locale } = settings;
  return { locale };
};

export default withRouter(connect(mapStateToProps, {})(Router));