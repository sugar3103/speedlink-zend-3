import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { PrivateRoute } from './_components';

// import logo from './logo.svg';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


//Auth Login

const Login = Loadable({
  loader: () => import('./views/Auth/Login'),
  loading
});

const Layout = Loadable({
  loader: () => import('./views/Layout'),
  loading
})

class App extends Component {  
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />            
            <PrivateRoute path="/" name="Dashboard" component={Layout} />            
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
