import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import getPreloadedState from "../dev/getPreloadedState";

const preloadedState =
  process.env.NODE_ENV === "development" ? getPreloadedState() : {};

const configureStore = (state = getPreloadedState()) =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

export default configureStore;
