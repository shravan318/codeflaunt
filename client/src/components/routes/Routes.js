import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alerts from "../alert/Alert";

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
import Settings from "../settings/Settings";
import CreatePost from "../createpost/CreatePost";

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
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/post/new" component={CreatePost} />

        <Route component={Notfound} />
      </Switch>
    </section>
  );
};

export default Routes;
