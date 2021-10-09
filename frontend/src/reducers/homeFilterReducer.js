const initialState = {
  vegType: 0,
  delivery: true,
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
    default:
      return state;
  }
};

export default homeFilterReducer;
