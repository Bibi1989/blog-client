import React, { createContext, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext();

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const REGISTER_ERROR = "REGISTER_ERROR";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOADING = "LOADING";
const USER = "USER";

const initialState = {
  register_data: {},
  login_data: {},
  register_errors: {},
  user: null,
  login_errors: {},
  loading: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        register_data: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        login_data: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        register_errors: action.payload,
      };
    case USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login_errors: action.payload,
      };
    default:
      return state;
  }
};

const USER_URL = "https://new-blog-api.herokuapp.com/auth/v1";
// const USER_URL = "http://localhost:7000/auth/v1";

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const register = async (body, history) => {
    try {
      const response = await axios.post(`${USER_URL}/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.data;
      if (data.status === "success") {
        sessionStorage.setItem("blog", response.data.data.token);
        sessionStorage.setItem("user", JSON.stringify(data.data));
        history.push("/login");
        dispatch({ type: REGISTER, payload: response.data.data });
      } else {
        dispatch({
          type: REGISTER_ERROR,
          payload: response.data.data.error,
        });
        history.push("/register");
      }
    } catch (error) {
      dispatch({ type: REGISTER_ERROR, payload: error.response.data.error });
    }
  };

  const login = async (body, history) => {
    console.log(body);
    try {
      const response = await axios.post(`${USER_URL}/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.data;
      console.log(data.status);
      if (data.status === "success") {
        sessionStorage.setItem("blog", response.data.data.token);
        sessionStorage.setItem("user", JSON.stringify(data.data));
        history.push("/");
        dispatch({ type: LOGIN, payload: response.data.data.data });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: response.data.data.error,
        });
        history.push("/login");
      }
    } catch (error) {
      // dispatch({ type: LOGIN_ERROR, payload: error.response.data.data.error });
      console.log(error.response);
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
      const data = response.data.data.data;
      console.log(data);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: USER, payload: data });
    } catch (error) {
      dispatch({ type: LOADING, payload: false });
      console.log(error.response);
    }
  };

  return (
    <UserContext.Provider
      value={{
        register,
        login,
        getUser,
        user: state.user,
        register_errors: state.register_errors,
        login_errors: state.login_errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
