import { combineReducers } from 'redux';
import books from './books';
import volume from './volume';
import characters from './characters';
import log from './log';

export default combineReducers({
  books, characters, volume, log
});
