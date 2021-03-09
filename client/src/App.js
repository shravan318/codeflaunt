import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Nav from "./components/nav/nav";
import Landing from "./components/landing/landing";
const App = () => (
  <Fragment>
    <Nav />
    <Landing />
  </Fragment>
);

export default App;
