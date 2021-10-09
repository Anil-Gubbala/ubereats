const initialState = {
  restaurantId: '',
  dishes: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM':
      console.log('item', action.payload);
      return {
        ...state,
      };
    case 'INSERT':
      return {
        ...state,
        restaurantId: action.payload.restaurantId,
        dishes: action.payload.dishes,
      };
    case 'CLEAR_CART':
      return {
        ...initialState,
      };
    case 'INSERT_NEW_REST':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default cartReducer;
