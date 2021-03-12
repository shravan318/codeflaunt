import axios from "axios";
import { bindActionCreators } from "redux";
import { setAlert } from "./alerts";
import { GET_POSTS, GET_PROFILE, POST_ERROR, UPDATE_LIKES } from "./constants";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//put likes

export const putLikes = (todoType, id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${todoType}/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
