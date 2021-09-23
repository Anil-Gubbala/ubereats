import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';

const reducers = combineReducers({
  loggedReducer,
});

export default reducers;
