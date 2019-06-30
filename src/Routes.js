import React from "react";
import App from "./App";
import { Route, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/track/:id" component={App} />
      <Route exact path="/album/:id" component={App} />
      <Route exact path="/artist/:id" component={App} />
    </div>
  </Router>
);

export default routing;
