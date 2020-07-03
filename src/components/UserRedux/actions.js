import {
  REGISTER,
  LOGIN,
  USERS,
  USER,
  UPDATE,
  DELETE,
  REGISTER_ERROR,
  LOGIN_ERROR,
  USERNOFILTER,
  LOADING,
} from "./types";

export const registerUserAction = (payload) => {
  return {
    type: REGISTER,
    payload,
  };
};
export const loginUserAction = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};
export const getAllUserAction = (payload) => {
  return {
    type: USERS,
    payload,
  };
};
export const getUserAction = (payload) => {
  return {
    type: USER,
    payload,
  };
};
export const updateUserAction = (payload) => {
  return {
    type: UPDATE,
    payload,
  };
};
export const deleteUserAction = (payload) => {
  return {
    type: DELETE,
    payload,
  };
};

export const getAllUsersNotFilterAction = (payload) => {
  return {
    type: USERNOFILTER,
    payload,
  };
};

export const updateUserImageAction = (payload) => {
  return {
    type: UPDATE,
    payload,
  };
};
export const loaderAction = (payload) => {
  return {
    type: LOADING,
    payload,
  };
};
