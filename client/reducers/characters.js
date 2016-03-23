import { handleActions } from 'redux-actions';

export default handleActions({
  'books.select': (state, action) => {
    const id = action.payload;
    return (window.__characters__ || {})[id] || {};
  },
  'characters.select': (state, action) => {
    const tag = action.payload;
    const { [tag]: { selected, ...current }, ...characters } = state;
    return {
      [tag]: { ...current, selected: !selected },
      ...characters
    }
  }
}, {});
