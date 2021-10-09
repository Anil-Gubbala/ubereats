const initialState = {
  vegType: 0,
  delivery: 0,
  favorite: 0,
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
    default:
      return state;
  }
};

export default homeFilterReducer;
