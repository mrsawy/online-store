import addItem from "./addItem";
import authReducer from "./auth";
import cartReducer from "./cart";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  addItem,
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducers;
