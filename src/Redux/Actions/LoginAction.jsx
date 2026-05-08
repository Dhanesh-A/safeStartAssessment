export const loginAction = (user) => ({
  type: 'LOGIN',
  payload: user
});

export const updateUser = (user) =>({
  type: 'UPDATEUSERNAME',
  payload: user
})

export const logoutAction = () => ({ 
  type: 'LOGOUT'
});
