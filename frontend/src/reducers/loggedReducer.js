import { LOG_REDUCER } from '../utils/consts';

const initialState = {
  [LOG_REDUCER.IS_LOGGEDIN]: false,
  [LOG_REDUCER.IS_CUSTOMER]: true,
  [LOG_REDUCER.EMAIL]: '',
};

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CUSTOMER':
      return {
        ...state,
        [LOG_REDUCER.IS_LOGGEDIN]: true,
        [LOG_REDUCER.IS_CUSTOMER]: true,
        [LOG_REDUCER.EMAIL]: action.payload,
      };
    case 'RESTAURANT':
      return {
        ...state,
        [LOG_REDUCER.IS_LOGGEDIN]: true,
        [LOG_REDUCER.IS_CUSTOMER]: false,
        [LOG_REDUCER.EMAIL]: action.payload,
      };
    case 'SIGNOUT':
      return { ...state, [LOG_REDUCER.IS_LOGGEDIN]: false };
    case 'SIGNUP':
      return {
        ...state,
        [LOG_REDUCER.IS_LOGGEDIN]: false,
        [LOG_REDUCER.IS_CUSTOMER]: true,
        [LOG_REDUCER.EMAIL]: action.payload,
      };
    default:
      return state;
  }
};

export default loggedReducer;
