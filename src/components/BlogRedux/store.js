import axios from "axios";
import {
  LOADING,
  COMMENT_LOADING,
  CURRENT,
  POST_ERROR,
  CLEAR_PROFILE,
  CLEAR_POST,
} from "./types";
// import jwtJsDecode from "jwt-js-decode";
import {
  getAction,
  addAction,
  updateAction,
  likePostAction,
  singleAction,
  usersPostAction,
  commentPostAction,
  deleteAction,
  commentsAction,
  notificationAction,
  getNotificationAction,
  deleteNotificationAction,
} from "./actions";

const token = JSON.parse(sessionStorage.getItem("blog"));

// const POST_URL = `http://localhost:7000/api/v1`;
// const POST_URL = `https://bibiblog-api.herokuapp.com/api`;
const POST_URL = `https://new-blog-api.herokuapp.com/api/v1`;

export const clearProfile = (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

export const clearPosts = (dispatch) => {
  dispatch({ type: CLEAR_POST });
};

export const getAllPosts = async (dispatch, text) => {
  try {
    dispatch({ type: LOADING, loading: true });
    const response = await axios.get(`${POST_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = [...response.data.data.data];
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
        if (text === "all") {
          text = "";
        }
        data = data.filter((post) =>
          post.username.toLowerCase().includes(text.toLowerCase())
        );
        console.log(data);
      }
    }
    dispatch({ type: LOADING, loading: false });
    dispatch(getAction(data));
  } catch (error) {
    console.log(error);
  }
};
export const getAPost = async (dispatch, id) => {
  // const token = sessionStorage.getItem("blog");
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
export const getUsersPosts = async (dispatch) => {
  // const token = sessionStorage.getItem("blog");
  try {
    dispatch({ type: LOADING, loading: true });
    const response = await axios.get(`${POST_URL}/posts/post/users`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch({ type: LOADING, loading: false });
    dispatch(usersPostAction(response.data.data.data));
  } catch (error) {
    console.log(error);
  }
};
export const addPost = async (dispatch, data, history) => {
  // const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.post(`${POST_URL}/posts`, data, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    if (response.data.data.status === "success") {
      dispatch(addAction(response.data.data.data));
    } else {
      dispatch({ type: POST_ERROR, payload: response.data.error });
    }
  } catch (error) {
    if (error.response.data) {
      history.push("/login");
    }
  }
};

// add photo
export const postPhoto = async (dispatch, data, history) => {
  // const token = JSON.parse(sessionStorage.getItem("blog"));
  console.log({ token });
  try {
    const response = await axios.post(`${POST_URL}/posts/photo`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        auth: token,
      },
    });
    if (response.data.data.status === "success") {
      dispatch(addAction(response.data.data.data));
    } else {
      dispatch({ type: POST_ERROR, payload: response.data.error });
    }
  } catch (error) {
    if (error.response.data) {
      history.push("/login");
    }
  }
};

export const updatePost = async (dispatch, data) => {
  // const token = sessionStorage.getItem("blog");
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
  // const token = sessionStorage.getItem("blog");
  dispatch({ type: COMMENT_LOADING, payload: true });
  try {
    const response = await axios.get(`${POST_URL}/comments/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch({ type: COMMENT_LOADING, payload: false });
    // const comments = response.data.data.data;
    const comments = response.data.data.comments;
    // const likes = response.data.data.likes;
    dispatch(commentsAction(comments));
    // dispatch({ type: SINGLE_POST, payload: response.data.data });
  } catch (error) {}
};

export const createComment = async (dispatch, message, id) => {
  // const token = sessionStorage.getItem("blog");
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
  // const token = sessionStorage.getItem("blog");
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
    dispatch(likePostAction(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (dispatch, id) => {
  // const token = sessionStorage.getItem("blog");
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
export const createNotification = async (dispatch, message, userId) => {
  const obj = {
    message,
    userId,
  };
  // const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.post(`${POST_URL}/notices`, obj, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch(notificationAction(response.data.data));
  } catch (error) {}
};

export const getNotifications = async (dispatch) => {
  // const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.get(`${POST_URL}/notices`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch(getNotificationAction(response.data.data.notices));
  } catch (error) {}
};
export const deleteNotification = async (dispatch, id) => {
  // const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.delete(`${POST_URL}/notices/${id}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    console.log({ notice: response.data.data });
    dispatch(deleteNotificationAction(response.data.data.notices));
  } catch (error) {}
};

export const setCurrentValue = (dispatch, post) => {
  dispatch({ type: CURRENT, payload: post });
};
