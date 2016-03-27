import { combineReducers } from 'redux';
import books from './books';
import faces from './faces';
import volume from './volume';
import characters from './characters';
import panels from './panels';
import log from './log';

export default combineReducers({
  books, characters, faces, volume, panels, log
});
