import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { configureStore } from "./redux/store";

import App from "./containers/App/App";
import history from './util/history';


const MainApp = () => (
  <Provider store={configureStore()}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
);

export default MainApp;
