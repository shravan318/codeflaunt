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
import Navigation from "./components/nav/Nav";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alerts from "./components/alert/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navigation />
          <Container fluid>
            <Alerts />
          </Container>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
