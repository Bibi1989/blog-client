import axios from "axios";
import { LOADING, FORGOT } from "./types";
// import jwtJsDecode from "jwt-js-decode";
import {
  registerUserAction,
  loginUserAction,
  getAllUserAction,
  getUserAction,
  updateUserAction,
  deleteUserAction,
  getAllUsersNotFilterAction,
  updateUserImageAction,
  loaderAction,
  loginError,
  registerError
} from "./actions";

const token = JSON.parse(sessionStorage.getItem("blog"));

const USER_URL = "https://new-blog-api.herokuapp.com/auth/v1";
// const USER_URL = "http://localhost:7000/auth/v1";

// export const clearProfile = (dispatch) => {
//   dispatch({ type: CLEAR_PROFILE });
// };

// export const clearPosts = (dispatch) => {
//   dispatch({ type: CLEAR_POST });
// };

export const registerUser = async (dispatch, body, path) => {
  try {
    const new_body = {
      ...body,
    };
    dispatch(loaderAction(true));
    const response = await axios.post(`${USER_URL}/register`, new_body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(loaderAction(null));
    dispatch(registerUserAction(response.data));
    window.location.href = path
  } catch (error) {
    dispatch(loaderAction(null));
    dispatch(registerError(error.response.data.error))
    console.log(error.response);
  }
};

// login user
export const loginUser = async (dispatch, body, path) => {
  try {
    dispatch(loaderAction(true));
    const response = await axios.post(`${USER_URL}/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data);
    dispatch(loaderAction(null));
    dispatch(loginUserAction(response.data));
    // getUser();
    window.location.href = path
  } catch (error) {
    console.log(error.response);
    dispatch(loginError(error.response.data.error))
    dispatch(loaderAction(null));
  }
};

export const getUser = async (dispatch, id) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(`${USER_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data.data;

    dispatch({ type: LOADING, payload: false });
    dispatch(getUserAction(data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const getAllUsers = async (dispatch, text) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(`${USER_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = response.data.data;

    data = data.filter((d) => d.username.toLowerCase().includes(text));
    dispatch({ type: LOADING, payload: false });
    dispatch(getAllUserAction(data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const getAllUsersNotFilter = async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(`${USER_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = response.data.data.data;

    dispatch({ type: LOADING, payload: false });
    dispatch(getAllUsersNotFilterAction(data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const updateUser = async (dispatch, id, body) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.patch(`${USER_URL}`, body, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });

    let data = response.data.data.data;
    dispatch({ type: LOADING, payload: false });
    dispatch(updateUserAction(data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const updateUserImage = async (dispatch, body) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.patch(`${USER_URL}/photo`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        auth: token,
      },
    });

    let data = response.data.data.data;
    dispatch({ type: LOADING, payload: false });
    dispatch(updateUserImageAction(data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const deleteUser = async (dispatch, id) => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.delete(`${USER_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = response.data.data.data;
    dispatch({ type: LOADING, payload: false });
    dispatch(deleteUserAction(data));
  } catch (error) {
    dispatch({ type: LOADING, payload: false });
    console.log(error.response);
  }
};

export const resetPassword = async (dispatch, email) => {
  try {
    const response = await axios.post(`${USER_URL}/forgot`, email, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: FORGOT, payload: response });
  } catch (error) {
    console.log(error.response);
  }
};
export const changePassword = async (dispatch, password, id) => {
  try {
    const response = await axios.patch(
      `${USER_URL}/resetpassword/${id}`,
      password,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: FORGOT, payload: response });
  } catch (error) {
    console.log(error.response);
  }
};

// export const setCurrentValue = (dispatch, post) => {
//   dispatch({ type: CURRENT, payload: post });
// };
