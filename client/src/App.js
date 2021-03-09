import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// components
import Nav from "./components/nav/nav";
import Login from "./components/auth/login";
const App = () => (
  <Router>
    <Fragment className="container">
      <Nav />
      <Route exact path="/" component={Login} />
    </Fragment>
  </Router>
);

export default App;
