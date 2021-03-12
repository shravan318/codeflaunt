import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";
import CustomSpinner from "../spinner/Spinner";
import { Card, Container } from "react-bootstrap";
import Avatar from "react-avatar";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./posts.css";

const Posts = (props) => {
  useEffect(() => {
    props.getPosts();
    props.getCurrentProfile();
  }, []);

  return props.post.loading ? (
    <CustomSpinner />
  ) : (
    <Fragment>
      <Container>
        {props.post.posts &&
          props.post.posts.map((post) => (
            <Card className="my-4 custom-post">
              <Card.Body>
                <Card.Title className="d-flex juistify-content-start align-items-center">
                  <Avatar
                    name={props.auth && props.auth.user.name}
                    maxInitials={2}
                    color="#1a1a1a"
                    fgColor="#ffffff"
                    size="30px"
                    round="50px"
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    {post.name}
                    <Card.Subtitle className="mt-1">
                      {props.profile && props.profile.position} at{" "}
                      {props.profile && props.profile.company}
                    </Card.Subtitle>
                    <Card.Subtitle className="mt-1 text-muted">
                      <Moment format="MMM DD YYYY hh:mm:ss">{post.date}</Moment>
                    </Card.Subtitle>
                  </div>
                </Card.Title>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
              <Card.Footer>
                {post.likes.length > 0 &&
                post.likes.filter((like) => like.user == props.auth.user) ? (
                  <>
                    <FontAwesomeIcon icon={faHeart} color="red" />{" "}
                    <span className="text-muted">{post.likes.length}</span>
                  </>
                ) : (
                  <FontAwesomeIcon icon={faHeart} color="lightgrey" />
                )}
              </Card.Footer>
              {/* <Card.Img variant="top" src="holder.js/100px180"  /> */}
            </Card>
          ))}
      </Container>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile.profile,
});
export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
