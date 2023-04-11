import { combineReducers } from "redux";
import appReducer from "./reducer";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
