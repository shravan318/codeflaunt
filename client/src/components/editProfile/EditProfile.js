import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { setProfile, getCurrentProfile } from "../../actions/profile";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faYoutube,
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const EditProfile = (props) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    position: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
  });

  useEffect(() => {
    props.getCurrentProfile();
    setFormData({
      company:
        props.profile.loading || !props.profile.profile.company
          ? ""
          : props.profile.profile.company,
      website:
        props.profile.loading || !props.profile.profile.website
          ? ""
          : props.profile.profile.website,
      location:
        props.profile.loading || !props.profile.profile.location
          ? ""
          : props.profile.profile.location,
      position:
        props.profile.loading || !props.profile.profile.position
          ? ""
          : props.profile.profile.position,
      skills:
        props.profile.loading || !props.profile.profile.skills
          ? ""
          : props.profile.profile.skills,
      bio:
        props.profile.loading || !props.profile.profile.bio
          ? ""
          : props.profile.profile.bio,
      githubusername:
        props.profile.loading || !props.profile.profile.githubusername
          ? ""
          : props.profile.profile.githubusername,
      youtube:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.youtube,
      twitter:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.twitter,
      facebook:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.facebook,
      linkedin:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.linkedin,
      instagram:
        props.profile.loading || !props.profile.profile.social
          ? ""
          : props.profile.profile.social.instagram,
    });
  }, [props.profile.loading]);
  const {
    company,
    website,
    location,
    position,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    props.setProfile(formData, props.history, true);
  };
  return (
    <Container>
      <Form onSubmit={(e) => onSubmit(e)}>
        {/* todo arry of form fields and map do not repeat code*/}
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
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
          </Col>
          <Col lg={10} md={12} sm={12}>
            <span>
              <span>{props.auth.user.name}</span>{" "}
              <Button variant="secondary" size="sm">
                Change Profile Picture
              </Button>
            </span>
          </Col>
        </Row>
        <hr />
        <h5>Basic Profile</h5>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Current Company</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Company"
              type="text"
              name="company"
              value={company}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Current Job Title</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Current Job Title"
              type="text"
              name="position"
              value={position}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Website</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="website"
              type="text"
              name="website"
              value={website}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Current Location</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            {/* to do location picker */}
            <Form.Control
              placeholder="Current location"
              type="text"
              name="location"
              value={location}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Skills</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="skills"
              type="text"
              name="skills"
              value={skills}
              onChange={(e) => handleChange(e)}
            />
            <Form.Text className="text-muted">
              enter all skills with comma as a seperator (eg. JS, ReactJS, PHP,)
            </Form.Text>
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Bio</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="bio"
              as="textarea"
              rows={3}
              name="bio"
              value={bio}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <hr />
        <h5>Social Media Links</h5>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faGithub} />
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="githubusername"
              type="text"
              name="githubusername"
              value={githubusername}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faYoutube} />
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Youtube channel link"
              type="text"
              name="youtube"
              value={youtube}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faTwitter} />
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Twitter profile link"
              type="text"
              name="twitter"
              value={twitter}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faFacebook} />
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Facebook profile link"
              type="text"
              name="facebook"
              value={facebook}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faLinkedin} />
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Linkedin profile link"
              type="text"
              name="linkedin"
              value={linkedin}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faInstagram} />
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Instagram profile link"
              type="text"
              name="instagram"
              value={instagram}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="m-5">
            Submit
          </Button>{" "}
          <Link to="/profile" className="m-5" variant="link">
            <Button variant="link">Back to profile</Button>
          </Link>{" "}
          <Link to="/" className="m-5" variant="link">
            <Button variant="link">Home</Button>
          </Link>{" "}
        </div>
      </Form>
    </Container>
  );
};

EditProfile.propType = {
  setProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { setProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
