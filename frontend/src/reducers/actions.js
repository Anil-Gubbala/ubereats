export const customer = () => (dispatch) => {
  dispatch({ type: 'CUSTOMER' });
};

export const restaurant = () => (dispatch) => {
  dispatch({ type: 'RESTAURANT' });
};

export const signout = () => (dispatch) => {
  dispatch({ type: 'SIGNOUT' });
};
