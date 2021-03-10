import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alerts from "../../components/alert/Alert";

import PrivateRoute from "../routes/PrivateRoute";
import { Container } from "react-bootstrap";
import { Wall } from "../wall/Wall";

const Routes = (props) => {
  return (
    <section>
      <Container fluid>
        <Alerts />
      </Container>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Wall} />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
