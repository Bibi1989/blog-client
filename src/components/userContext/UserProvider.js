import React, { createContext, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext();

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const REGISTER_ERROR = "REGISTER_ERROR";
const LOGIN_ERROR = "LOGIN_ERROR";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const LOADING = "LOADING";
const USERS = "USERS";
const USER = "USER";
const USERNOFILTER = "USERNOFILTER";
const FORGOT = "FORGOT";

const initialState = {
  token: localStorage.getItem("blog"),
  register_data: {},
  login_data: {},
  isAuth: null,
  register_errors: {},
  update: {},
  delete_user: {},
  user: null,
  users: null,
  allUsers: null,
  login_errors: {},
  loading: null,
  forgot: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER:
      sessionStorage.setItem("blog", JSON.stringify(action.payload.token));
      sessionStorage.setItem("user", JSON.stringify(action.payload.data));
      return {
        ...state,
        register_data: action.payload,
        user: action.user,
      };
    case LOGIN:
      sessionStorage.setItem("blog", JSON.stringify(action.payload.token));
      sessionStorage.setItem("user", JSON.stringify(action.payload.data));
      return {
        ...state,
        login_data: action.payload,
        isAuth: action.auth ? true : null,
        user: action.user,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        register_errors: action.payload,
        user: action.user,
      };
    case USER:
      return {
        ...state,
        user: action.payload,
      };
    case USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case USERNOFILTER:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        update: action.payload,
      };
    case DELETE:
      return {
        ...state,
        delete_user: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login_errors: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FORGOT:
      return {
        ...state,
        forgot: action.payload,
      };
    default:
      return state;
  }
};

// const USER_URL = "https://new-blog-api.herokuapp.com/auth/v1";
const USER_URL = "http://localhost:7000/auth/v1";

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // register user
  const register = async (body, history) => {
    try {
      const new_body = {
        ...body,
      };
      dispatch({ type: LOADING, payload: true });
      const response = await axios.post(`${USER_URL}/register`, new_body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: LOADING, payload: null });
      dispatch({
        type: REGISTER,
        payload: response.data,
        isAuth: false,
        user: response.data.data,
      });
      history.push("/");
    } catch (error) {
      dispatch({ type: LOADING, payload: null });
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response.data.error,
        isAuth: null,
        user: null,
      });
    }
  };

  // login user
  const login = async (body, history) => {
    try {
      dispatch({ type: LOADING, payload: true });
      const response = await axios.post(`${USER_URL}/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data);
      dispatch({ type: LOADING, payload: null });
      dispatch({
        type: LOGIN,
        payload: response.data,
        isAuth: false,
        user: response.data.data,
      });
      getUser();
      history.push("/");
    } catch (error) {
      dispatch({ type: LOADING, payload: null });
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data && error.response.data.error,
        isAuth: null,
        user: null,
      });
      history.push("/login");
    }
  };

  const getUser = async (id) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const response = await axios.get(`${USER_URL}/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data.data;
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: USER, payload: data, auth: true });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const getAllUsers = async (text) => {
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
      dispatch({ type: USERS, payload: data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };
  const getAllUsersNotFilter = async () => {
    dispatch({ type: LOADING, payload: true });
    try {
      const response = await axios.get(`${USER_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = response.data.data.data;
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: USERNOFILTER, payload: data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  const updateUser = async (id, body) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const response = await axios.patch(`${USER_URL}`, body, {
        headers: {
          "Content-Type": "application/json",
          auth: sessionStorage.getItem("blog"),
        },
      });

      let data = response.data.data.data;
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  const updateUserImage = async (body) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const response = await axios.patch(`${USER_URL}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          auth: sessionStorage.getItem("blog"),
        },
      });

      let data = response.data.data.data;
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  const deleteUser = async (id) => {
    dispatch({ type: LOADING, payload: true });
    try {
      const response = await axios.delete(`${USER_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = response.data.data.data;
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: DELETE, payload: data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await axios.post(`${USER_URL}/forgot`, email, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: FORGOT, payload: response });
    } catch (error) {}
  };
  const changePassword = async (password, id) => {
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
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        register,
        login,
        getUser,
        getAllUsers,
        getAllUsersNotFilter,
        updateUser,
        updateUserImage,
        deleteUser,
        resetPassword,
        changePassword,
        isAuth: state.isAuth,
        user: state.user,
        users: state.users,
        update: state.update,
        delete_user: state.delete_user,
        allUsers: state.allUsers,
        register_errors: state.register_errors,
        login_errors: state.login_errors,
        loading: state.loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
