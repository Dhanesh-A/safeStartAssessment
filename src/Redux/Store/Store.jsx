import { createStore } from "redux";
import  LoginReducer  from "../Reducers/LoginReducer";


const store = createStore(
  LoginReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;