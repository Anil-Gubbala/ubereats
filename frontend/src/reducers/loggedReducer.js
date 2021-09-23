const loggedReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CUSTOMER':
      return 1;
    case 'RESTAURANT':
      return 2;
    case 'SIGNOUT':
      return 0;
    default:
      return state;
  }
};

export default loggedReducer;
