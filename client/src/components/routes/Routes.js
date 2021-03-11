import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alerts from "../../components/alert/Alert";

import PrivateRoute from "../routes/PrivateRoute";
import { Container } from "react-bootstrap";
import Wall from "../wall/Wall";
import Navigation from "../nav/Nav";
import Notfound from "../notfound/Notfound";
import Profile from "../profile/Profile";
import CreateProfile from "../createProfile/CreateProfile";
import EditProfile from "../editProfile/EditProfile";
import AddEducation from "../education/AddEducation";
import AddExp from "../exp/AddExp";

const Routes = (props) => {
  return (
    <section>
      <Navigation />
      <Container fluid>
        <Alerts />
      </Container>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Wall} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/createprofile" component={CreateProfile} />
        <PrivateRoute exact path="/editprofile" component={EditProfile} />
        <PrivateRoute exact path="/profile/addedu" component={AddEducation} />
        <PrivateRoute exact path="/profile/addexp" component={AddExp} />

        <Route component={Notfound} />
      </Switch>
    </section>
  );
};

export default Routes;
