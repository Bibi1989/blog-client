import { combineReducers } from "redux";
import { postReducer } from "../components/BlogRedux/reducer";
import userReducer from "../components/UserRedux/reducer";

const appReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});

export default appReducer;
