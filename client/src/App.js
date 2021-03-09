import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import setAuthToken from "./utils/authToken";
import { loadUser } from "./actions/auth";
import { Container } from "react-bootstrap";
//redux
import { Provider } from "react-redux";
import store from "./store";

// components
import Nav from "./components/nav/nav";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Alerts from "./components/alert/alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Nav />
          <Container fluid>
            <Alerts />
          </Container>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
