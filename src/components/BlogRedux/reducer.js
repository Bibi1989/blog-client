import {
  GET,
  ADD,
  LIKE_POST,
  GET_SINGLE,
  COMMENT_POST,
  LOADING,
  DELETE,
} from "./types";

const initialState = {
  posts: [],
  post: null,
  likes: [],
  comments: [],
  added_post: null,
  updated_post: null,
  deleted_post: null,
  added_comment: null,
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        posts: action.post,
      };
    case GET_SINGLE:
      return {
        ...state,
        post: action.post,
      };
    case COMMENT_POST:
      return {
        ...state,
        added_comment: action.post,
      };
    case ADD:
      return {
        ...state,
        added_post: action.post,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: action.post,
      };
    case DELETE:
      return {
        ...state,
        deleted_post: action.post,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
};
