import { handleActions } from 'redux-actions';
import { updateSelected } from '../utils';

function updateProps(books, props) {
  return updateSelected(books, (book) => {
    return { ...book, ...props };
  });
}

function updateCharacter(books, n, props) {
  return updateSelected(books, (book) => {
    return {
      ...book,
      dirty: true,
      characters: book.characters.map((character, index) => {
        if(index == n) {
          return { ...character, ...props };
        } else {
          return character;
        }
      })
    }
  });
}

function randomId() {
  return Math.floor(10000000*Math.random()).toString(16)
}

export default handleActions({
  'books.select': (state, action) => {
    const id = action.payload;
    return state.map((book) => {
      return { ...book, selected: book.id == id };
    })
  },
  'books.addBook': (state) => {
    const books = updateProps(state, { selected: false });
    const book = {
      id: randomId(),
      title: null,
      volume: 1,
      characters: [],
      selected: true,
      draft: true,
      dirty: true
    };
    return [  ...books, book ];
  },
  'books.changeID': (state, action) => {
    return updateProps(state, { id: action.payload, dirty: true });
  },
  'books.changeTitle': (state, action) => {
    return updateProps(state, { title: action.payload, dirty: true });
  },
  'books.changeVolume': (state, action) => {
    return updateProps(state, { volume: action.payload, dirty: true });
  },
  'books.addChraracter': (state) => {
    return updateSelected(state, (book) => {
      return {
        ...book,
        dirty: true,
        characters: [ ...book.characters, { tag: null, name: null, color: null } ] }
    });
  },
  'books.changeTag': (state, { payload: { index, value }}) => {
    return updateCharacter(state, index, { tag: value });
  },
  'books.changeName': (state, { payload: { index, value }}) => {
    return updateCharacter(state, index, { name: value });
  },
  'books.changeColor': (state, { payload: { index, value }}) => {
    return updateCharacter(state, index, { color: value });
  },
  'books.save': (state) => {
    return updateProps(state, { draft: false, dirty: false });
  }
}, window.__books__ || []);
