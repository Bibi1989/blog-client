import {
  LOADING,
  FORGOT,
  REGISTER,
  LOGIN,
  USERS,
  USER,
  UPDATE,
  DELETE,
  REGISTER_ERROR,
  LOGIN_ERROR,
  USERNOFILTER,
} from "./types";

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

const reducer = (state = initialState, action) => {
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
      console.log({ loading: action.payload });
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

export default reducer;
