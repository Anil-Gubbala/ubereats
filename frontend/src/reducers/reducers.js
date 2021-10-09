import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import cartReducer from './cartReducer';
import homeFilterReducer from './homeFilterReducer';

const reducers = combineReducers({
  loggedReducer,
  cartReducer,
  homeFilterReducer,
});

export default reducers;
