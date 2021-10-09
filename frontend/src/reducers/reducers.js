import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import cartReducer from './cartReducer';
import homeFilterReducer from './homeFilterReducer';
import newRestReducer from './newRestReducer';

const reducers = combineReducers({
  loggedReducer,
  cartReducer,
  homeFilterReducer,
  newRestReducer,
});

export default reducers;
