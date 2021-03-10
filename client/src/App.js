import { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import setAuthToken from "./utils/authToken";

//redux
import { Provider } from "react-redux";
import store from "./store";

// components
import Routes from "./components/routes/Routes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
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
