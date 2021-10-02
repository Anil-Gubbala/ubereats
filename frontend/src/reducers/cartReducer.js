const initialState = {};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM':
      console.log('reducer');
      return {
        ...state,
      };
    default:
      return initialState;
  }
};

export default cartReducer;
