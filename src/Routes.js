import React from "react";
import App from "./App";
import Oops from "./components/Oops";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

/**
 * Routes for Router
 */

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/track/:id" component={App} />
      <Route exact path="/album/:id" component={App} />
      <Route exact path="/artist/:id" component={App} />
      <Route component={Oops} />
    </Switch>
  </Router>
);

export default routing;
