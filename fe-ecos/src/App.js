import React, { Component } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { history } from './helpers';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import NotFoundPage from './components/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import StatusPage from './pages/MasterData/StatusPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PwResetPage from './pages/PwResetPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <HomePage><Component {...props} /></HomePage>
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const PublicRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    !localStorage.getItem('user') 
      ? <AuthPage><Component {...props} /></AuthPage>
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <PrivateRoute path="/status" component={StatusPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/register" component={RegisterPage} />
          <PublicRoute path="/password_reset" component={PwResetPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
