import React from "react";
import {
  ADD_POST,
  GET_POSTS,
  LIKE_POST,
  SINGLE_POST,
  CREATE_COMMENT,
  DELETE_POST
} from "./blogTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case ADD_POST:
      return {
        ...state,
        added_post: action.payload
      };
    case LIKE_POST:
      return {
        ...state,
        like_post: action.payload
      };
    case SINGLE_POST:
      return {
        ...state,
        single_post: action.payload
      };
    case CREATE_COMMENT:
      return {
        ...state,
        created_comment: action.payload
      };
    case DELETE_POST:
      return {
        ...state,
        delete_msg: action.payload
      };
    default:
      return state;
  }
  return <div></div>;
};

export default reducer;
