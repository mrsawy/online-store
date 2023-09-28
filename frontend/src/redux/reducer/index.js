import addItem from "./addItem";
import authReducer from "./auth";
import cartReducer from "./cart";
import orderReducer from "./order";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  addItem,
  auth: authReducer,
  cart: cartReducer,
  orders:orderReducer
});

export default rootReducers;
