import React, { Component } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { history } from './helpers';
import routes from './routes';
import HomePage from './components/Layout';
import AuthPage from './components/AuthPage';
import NotFoundPage from './components/NotFoundPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PwReset from './pages/Auth/PwReset';

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

  showRoute = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <PrivateRoute 
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          {this.showRoute(routes)}
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/password_reset" component={PwReset} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
