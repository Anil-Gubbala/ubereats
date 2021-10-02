import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import cartReducer from './cartReducer';

const reducers = combineReducers({
  loggedReducer,
  cartReducer,
});

export default reducers;
