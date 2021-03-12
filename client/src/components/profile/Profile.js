import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, getRepo } from "../../actions/profile";
import PropTypes from "prop-types";
import { Fragment } from "react";
import Avatar from "react-avatar";
import {
  Badge,
  Container,
  Tabs,
  Tab,
  Jumbotron,
  Button,
} from "react-bootstrap";
import "./profile.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ViewEdu from "../education/ViewEdu";
import ViewExp from "../exp/ViewExp";
import Repos from "../repos/Repos";

const Profile = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
  return (
    <div>
      {props.profile.profile !== null ? (
        <Container>
          <div className="profile-header-section">
            <Avatar
              name={props.auth.user.name}
              maxInitials={2}
              color="#1a1a1a"
              fgColor="#ffffff"
              size="8em"
              round="50%"
              textSizeRatio={2}
              style={{
                width: "20%",
              }}
            />

            <div className="profile-header-section-right">
              <h3>
                {props.auth.user.name}{" "}
                <Link className="text-muted" to="/editprofile">
                  <FontAwesomeIcon
                    style={{ marginLeft: "2em" }}
                    icon={faEdit}
                    size="sm"
                  />
                </Link>
              </h3>
              <p>{props.profile.profile.bio}</p>
              {props.profile.profile.skills.map((skill) => (
                <Badge key={skill} variant="primary" className="mx-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="profile-body-tabs mt-5">
            <Tabs defaultActiveKey="Projects">
              <Tab eventKey="Posts" title="Posts">
                dasdasdsad
              </Tab>
              <Tab eventKey="Projects" title="Projects">
                {props.profile.profile.githubusername && (
                  <Repos username={props.profile.profile.githubusername} />
                )}
              </Tab>
              <Tab eventKey="Work" title="Work">
                <ViewExp />
              </Tab>
              <Tab eventKey="Education" title="Education">
                <ViewEdu />
              </Tab>
            </Tabs>
          </div>
        </Container>
      ) : (
        <Fragment>
          <Jumbotron className="text-center">
            <p>Hello, {props.auth.user.name}!</p>
            <h3>Please Create / Finish your profile !</h3>

            <Link to="/createprofile">
              <Button className="mt-5">Create Profile</Button>
            </Link>
          </Jumbotron>
        </Fragment>
      )}
    </div>
  );
};

Profile.protoType = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, getRepo })(
  Profile
);
