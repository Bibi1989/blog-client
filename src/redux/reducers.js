import { combineReducers } from "redux";
import { postReducer } from "../components/BlogRedux/reducer";

const appReducer = combineReducers({
  posts: postReducer,
});

export default appReducer;
