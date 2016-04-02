import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import books from './books';
import demo from './demo';
import volume from './volume';
import characters from './characters';
import panels from './panels';
import log from './log';
import query from './query';

export default combineReducers({
  books, characters, volume, panels, log, demo, query, routing: routerReducer
});
