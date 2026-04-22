import { createStore } from "redux";
import LoginReducer from "../Reducers/LoginReducer";

// ✅ Load user from localStorage when app starts
const loadState = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) return undefined;
    return { user: JSON.parse(serializedUser) };
  } catch (err) {
    return undefined;
  }
};

// ✅ Save user to localStorage whenever Redux state changes
const saveState = (state) => {
  try {
    const serializedUser = JSON.stringify(state.user);
    localStorage.setItem('user', serializedUser);
  } catch (err) {
    console.error('Could not save state:', err);
  }
};

const store = createStore(
  LoginReducer,
  loadState(),  // ✅ load saved state on startup
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// ✅ Subscribe to save state on every Redux change
store.subscribe(() => {
  saveState(store.getState());
});

export default store;