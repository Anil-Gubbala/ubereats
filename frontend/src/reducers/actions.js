export const customer = (payload) => (dispatch) => {
  dispatch({ type: 'CUSTOMER', payload });
};

export const restaurant = (payload) => (dispatch) => {
  dispatch({ type: 'RESTAURANT', payload });
};

export const signout = () => (dispatch) => {
  dispatch({ type: 'SIGNOUT' });
};

export const signup = (payload) => (dispatch) => {
  dispatch({ type: 'SIGNUP', payload });
};
