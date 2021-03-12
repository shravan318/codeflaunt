import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, putLikes, delPost } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";
import CustomSpinner from "../spinner/Spinner";
import { Button, Card, Container, Modal } from "react-bootstrap";
import Avatar from "react-avatar";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./posts.css";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState({
    id: "",
  });

  const handleClose = () => {
    setShow(false);
  };
  const handleDelete = () => {
    setShow(false);
    props.delPost(id);
  };
  const handleShow = (exp_id) => {
    setShow(true);
    setId(exp_id);
  };
  useEffect(() => {
    props.getPosts();
    props.getCurrentProfile();
  }, []);
  const handleUnlike = async (postId) => {
    props.putLikes("unlike", postId);
  };
  const handleLike = (postId) => {
    props.putLikes("like", postId);
  };

  return props.post.loading ? (
    <CustomSpinner />
  ) : (
    <Fragment>
      <Container>
        {props.post.posts &&
          props.post.posts.map((post) => (
            <Card key={post._id} className="my-4 custom-post">
              <Card.Body>
                <Card.Title className="d-flex juistify-content-start align-items-center">
                  <Avatar
                    name={props.auth.user && props.auth.user.name}
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
                    <Link to={`/profile/${post.user}`}> {post.name}</Link>
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
                props.auth.user &&
                post.likes.filter((like) => like.user == props.auth) ? (
                  <>
                    <FontAwesomeIcon
                      icon={faHeart}
                      color="red"
                      onClick={() => handleUnlike(post._id)}
                    />{" "}
                    <span className="text-muted">{post.likes.length}</span>
                  </>
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="lightgrey"
                    onClick={() => handleLike(post._id)}
                  />
                )}
                <FontAwesomeIcon
                  icon={faComment}
                  className="mx-5"
                  color="lightgrey"
                  onClick={() => handleLike(post._id)}
                />{" "}
                {!props.auth.loading &&
                props.auth.user &&
                post.user === props.auth.user._id ? (
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="lightgrey "
                    className="float-right"
                    onClick={() => handleShow(post._id)}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                ) : null}
                <>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Woohoo, you're deleting this post! Are you sure?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="danger" onClick={handleDelete}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
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
export default connect(mapStateToProps, {
  getPosts,
  getCurrentProfile,
  putLikes,
  delPost,
})(Posts);
