import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { defaultStartPath } from '../../constants/defaultValues';
import { connect } from "react-redux";

import AppLocale from '../../lang';
import MainRoute from '../../routes';

import MainWrapper from './MainWrapper';
import Login from '../../routes/auth/login';
import NotFound from '../../components/NotFound';

const InitialPath = ({ component: Component, authUser, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />}
  />;

class Router extends Component {
  render() {
    const { location, match, user, locale } = this.props;
    
    const currentAppLocale = AppLocale[locale];
    if (location.pathname === '/' || location.pathname === '/app' || location.pathname === '/app/') {
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
              <Switch>
                <InitialPath
                  path={`${match.url}app`}
                  authUser={user}
                  component={MainRoute}
                />
                <Route path={`/login`} component={Login} />
                <Route path={`/error`} component={NotFound} />
                <Redirect to="/error" />
              </Switch>
            </main>
          </MainWrapper>
        </IntlProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const user = {};
  const { locale } = settings;
  return { user, locale };
};

export default withRouter(connect(mapStateToProps, {})(Router));