import {
  GET,
  ADD,
  LIKE_POST,
  GET_SINGLE,
  COMMENT_POST,
  COMMENTS,
  LOADING,
  COMMENT_LOADING,
  DELETE,
  UPDATE,
  ADD_NOTICE,
  NOTICE,
  DELETE_NOTIFICATION,
  CURRENT,
  USER_POSTS,
  POST_ERROR,
  CLEAR_POST,
  CLEAR_PROFILE,
  PAGINATION,
} from "./types";

const initialState = {
  posts: null,
  post: null,
  user_post: null,
  update: null,
  likes: [],
  comments: [],
  added_post: null,
  updated_post: null,
  deleted_post: null,
  added_comment: null,
  added_notice: null,
  notices: [],
  deleted_notices: null,
  loading: false,
  error: null,
  current: null,
  post_error: null,
  pagination: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        posts: [...action.post],
      };
    case PAGINATION:
      return {
        ...state,
        pagination: action.pagination,
      };
    case GET_SINGLE:
      return {
        ...state,
        post: { ...action.post },
      };
    case USER_POSTS:
      return {
        ...state,
        user_post: action.post,
      };
    case COMMENTS:
      return {
        ...state,
        comments: action.post,
      };
    case COMMENT_POST:
      return {
        ...state,
        added_comment: action.post,
      };
    case ADD:
      return {
        ...state,
        posts: [action.post, ...state.posts],
      };
    case UPDATE:
      return {
        ...state,
        update: action.post,
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
    case NOTICE:
      return {
        ...state,
        notices: action.post,
      };
    case ADD_NOTICE:
      return {
        ...state,
        added_notice: action.post,
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        deleted_notices: action.post,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case COMMENT_LOADING:
      return {
        ...state,
        comment_loading: action.loading,
      };
    case CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case POST_ERROR:
      return {
        ...state,
        post_error: action.payload,
      };
    case CLEAR_POST:
      return {
        ...state,
        posts: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        posts: null,
      };

    default:
      return state;
  }
};
