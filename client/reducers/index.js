import { combineReducers } from 'redux';
import books from './books';
import volume from './volume';
import characters from './characters';

export default combineReducers({
  books, characters, volume
});
