import axios from "axios";
import { LOADING, LIKE_POST } from "./types";
import {
  getAction,
  addAction,
  likePostAction,
  singleAction,
  commentPostAction,
} from "./actions";

const POST_URL = `http://localhost:5005/api`;

export const getAllPosts = async (dispatch) => {
  try {
    dispatch({ type: LOADING, loading: true });
    const response = await axios.get(`${POST_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: LOADING, loading: false });
    dispatch(getAction(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
export const getAPost = async (dispatch, id) => {
  const token = sessionStorage.getItem("blog");
  try {
    dispatch({ type: LOADING, loading: true });
    const response = await axios.get(`http://localhost:5005/api/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    console.log({ response: response.data.data });
    dispatch({ type: LOADING, loading: false });
    dispatch(singleAction(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
export const addPost = async (dispatch, data) => {
  const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.post(`${POST_URL}/posts`, data, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch(addAction(response.data));
  } catch (error) {}
};

export const getComments = async (dispatch, id) => {
  const token = sessionStorage.getItem("blog");
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(`http://localhost:5005/api/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch({ type: LOADING, payload: false });
    const comments = response.data.data.comments;
    // const likes = response.data.data.likes;
    dispatch(commentPostAction(comments));
    // dispatch({ type: SINGLE_POST, payload: response.data.data });
  } catch (error) {}
};

export const createComment = async (dispatch, body, id) => {
  const token = sessionStorage.getItem("blog");
  console.log({ body });
  try {
    const response = await axios.post(
      `http://localhost:5005/api/comments/${id}`,
      { body },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );
    dispatch(commentPostAction(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (dispatch, id) => {
  const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.post(
      `${POST_URL}/likes`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );
    dispatch(likePostAction(response.data));
  } catch (error) {
    console.log(error);
  }
};
