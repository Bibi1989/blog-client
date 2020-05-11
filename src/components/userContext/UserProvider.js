import React, { createContext, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext();

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const REGISTER_ERROR = "REGISTER_ERROR";
const LOGIN_ERROR = "LOGIN_ERROR";

const initialState = {
  register_data: {},
  login_data: {},
  register_errors: {},
  login_errors: {},
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
    case LOGIN_ERROR:
      return {
        ...state,
        login_errors: action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const register = async (body) => {
    try {
      const response = await axios.post(
        `https://bibiblog-api.herokuapp.com/users/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      sessionStorage.setItem("blog", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.data));

      dispatch({ type: REGISTER, payload: response.data.data });
    } catch (error) {
      dispatch({ type: REGISTER_ERROR, payload: error.response.data.error });
    }
  };

  const login = async (body) => {
    try {
      const response = await axios.post(
        `https://bibiblog-api.herokuapp.com/users/login`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      sessionStorage.setItem("blog", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      dispatch({ type: LOGIN, payload: response.data });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, payload: error.response.data.error });
    }
  };
  console.log(state.register);
  return (
    <UserContext.Provider
      value={{
        register,
        login,
        register_errors: state.register_errors,
        login_errors: state.login_errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
