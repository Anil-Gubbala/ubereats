const initialState = {
  previousId: '',
  restaurantId: '',
  dish: '',
  price: '',
};

const newRestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_WARNING':
      return {
        ...state,
        restaurantId: action.payload.restaurantId,
        dish: action.payload.dish,
        price: action.payload.price,
        previousId: action.payload.previousId,
      };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};

export default newRestReducer;
