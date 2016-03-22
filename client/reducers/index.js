import { combineReducers } from 'redux';
import books from './books';
import volume from './volume';

export default combineReducers({
  books, volume
});
