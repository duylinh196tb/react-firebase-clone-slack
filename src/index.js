import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import "semantic-ui-css/semantic.min.css";
import firebase from "./firebase";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { setUser, clearUser } from "./redux/actions/user";
import { connect } from "react-redux";
import Spinner from "./Components/Spinner";

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    );
  }
}

const RouteWithAuth = withRouter(
  connect(
    state => ({
      isLoading: state.User.isLoading
    }),
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RouteWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
