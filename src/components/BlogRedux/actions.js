import {
  GET,
  ADD,
  GET_SINGLE,
  DELETE,
  UPDATE,
  LIKE_POST,
  COMMENT_POST,
  COMMENTS,
} from "./types";

export const getAction = (post) => {
  return {
    type: GET,
    post,
  };
};
export const addAction = (post) => {
  return {
    type: ADD,
    post,
  };
};
export const singleAction = (post) => {
  return {
    type: GET_SINGLE,
    post,
  };
};
export const deleteAction = (post) => {
  return {
    type: DELETE,
    post,
  };
};
export const updateAction = (post) => {
  return {
    type: UPDATE,
    post,
  };
};
export const likePostAction = (post) => {
  return {
    type: LIKE_POST,
    post,
  };
};
export const commentsAction = (post) => {
  return {
    type: COMMENTS,
    post,
  };
};
export const commentPostAction = (post) => {
  return {
    type: COMMENT_POST,
    post,
  };
};
