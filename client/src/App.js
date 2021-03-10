import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import setAuthToken from "./utils/authToken";
import { LOGOUT } from "./actions/constants";
import { loadUser } from "./actions/auth";
//redux
import { Provider } from "react-redux";
import store from "./store";

// components
import Routes from "./components/routes/Routes";

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
          <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
