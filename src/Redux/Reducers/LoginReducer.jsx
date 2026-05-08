const initialState = { user: null };

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'UPDATEUSERNAME':  return { ...state, user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');  // ✅ clear localStorage on logout
      return { ...state, user: null };
    default:
      return state;
  }
};

export default LoginReducer;