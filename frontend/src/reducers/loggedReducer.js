const initialState = {
  isLoggedIn: false,
  isCustomer: true,
  email: '',
};

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CUSTOMER':
      return {
        ...state,
        isLoggedIn: true,
        isCustomer: true,
        email: action.payload,
      };
    case 'RESTAURANT':
      return {
        ...state,
        isLoggedIn: true,
        isCustomer: false,
        email: action.payload,
      };
    case 'SIGNOUT':
      return { ...state, isLoggedIn: false };
    case 'SIGNUP':
      return {
        ...state,
        isLoggedIn: false,
        isCustomer: true,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default loggedReducer;
