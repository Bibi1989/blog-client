import axios from "axios";
import { LOADING, LIKE_POST } from "./types";
// import jwtJsDecode from "jwt-js-decode";
import {
  getAction,
  addAction,
  updateAction,
  likePostAction,
  singleAction,
  commentPostAction,
  deleteAction,
  commentsAction,
} from "./actions";

// const POST_URL = `http://localhost:7000/api/v1`;
// const POST_URL = `https://bibiblog-api.herokuapp.com/api`;
const POST_URL = `https://new-blog-api.herokuapp.com/api/v1`;

export const getAllPosts = async (dispatch, text) => {
  try {
    dispatch({ type: LOADING, loading: true });
    const response = await axios.get(`${POST_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = [...response.data.data.data];
    // console.log(data);
    if (text) {
      if (
        text === "post" ||
        text === "dev" ||
        text === "article" ||
        text === "question"
      ) {
        data = data.filter((post) => {
          return post.tags.toLowerCase().includes(text.toLowerCase());
        });
      } else {
        data = data.filter((post) =>
          post.User.username.toLowerCase().includes(text.toLowerCase())
        );
      }
    }
    dispatch({ type: LOADING, loading: false });
    dispatch(getAction(data));
  } catch (error) {
    console.log(error);
  }
};
export const getAPost = async (dispatch, id) => {
  const token = sessionStorage.getItem("blog");
  try {
    dispatch({ type: LOADING, loading: true });
    const response = await axios.get(`${POST_URL}/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch({ type: LOADING, loading: false });
    dispatch(singleAction(response.data.data.data));
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

export const updatePost = async (dispatch, data) => {
  const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.patch(`${POST_URL}/posts`, data, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch(updateAction(response.data));
  } catch (error) {}
};

export const getComments = async (dispatch, id) => {
  const token = sessionStorage.getItem("blog");
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(`${POST_URL}/comments/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch({ type: LOADING, payload: false });
    // const comments = response.data.data.data;
    const comments = response.data.data.comments;
    console.log(comments);
    // const likes = response.data.data.likes;
    dispatch(commentsAction(comments));
    // dispatch({ type: SINGLE_POST, payload: response.data.data });
  } catch (error) {}
};

export const createComment = async (dispatch, message, id) => {
  const token = sessionStorage.getItem("blog");
  console.log({ message });
  try {
    const response = await axios.post(
      `${POST_URL}/comments/${id}`,
      { message },
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
      { postId: id },
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

export const deletePost = async (dispatch, id) => {
  const token = sessionStorage.getItem("blog");
  dispatch({ type: LOADING, loading: true });
  try {
    const response = await axios.delete(`${POST_URL}/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch({ type: LOADING, loading: false });
    dispatch(deleteAction(response.data));
  } catch (error) {}
};
