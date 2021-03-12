import axios from "axios";
import { setAlert } from "./alerts";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from "./constants";

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

//delete post
export const delPost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("post removed", "success"));
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
