import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import userReducer from './userReducer';
import searchResultReducer from './searchResultReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  searchReducer,
  userReducer,
  searchResultReducer,
  favoritesReducer
})

export default rootReducer;