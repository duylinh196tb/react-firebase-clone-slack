import React from "react";
import ReactDOM from "react-dom";

import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import "semantic-ui-css/semantic.min.css";

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
