import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import appReducer from "./reducers";

const loggerMiddleware = createLogger();
const enhancers = [];
const initialState = {};

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(loggerMiddleware);
}

if (process.env.NODE_ENV === "development") {
  const devToolsExtension =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composeEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(appReducer, initialState, composeEnhancers);

export default store;
