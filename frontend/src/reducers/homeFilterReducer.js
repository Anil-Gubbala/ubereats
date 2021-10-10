const initialState = {
  vegType: -1, // 0:nonveg, 1: veg, 2: vegan
  delivery: -1, // 0:delivery, 1: pick up
  favorite: 0, // 0: all , 1: favorite
};

const homeFilterReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'VEG':
      return {
        ...state,
        ...payload,
      };
    case 'DELIVERY':
      return {
        ...state,
        ...payload,
      };
    case 'FAVORITE':
      return {
        ...state,
        ...payload,
      };
    case 'CLEAR_HOME_FILTERS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default homeFilterReducer;
