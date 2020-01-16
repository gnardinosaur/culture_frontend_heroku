import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
import searchResultReducer from './searchResultReducer';

const rootReducer = combineReducers({
  searchReducer,
  userReducer,
  searchResultReducer
})

export default rootReducer;