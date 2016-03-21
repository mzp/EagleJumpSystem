import { handleActions } from 'redux-actions';

export default handleActions({
  'books.select': (state, action) => {
    const id = action.payload;
    return state.map((book) => {
      return { ...book, selected: book.id == id };
    })
  }
}, window.__books__ || []);
