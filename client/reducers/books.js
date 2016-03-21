import { handleActions } from 'redux-actions';

function map(books, f) {
  return books.map((book) => {
    if(book.selected) {
      return f(book);
    } else {
      return book;
    }
  });
}

function updateProps(books, props) {
  return map(books, (book) => {
    return { ...book, ...props };
  });
}

function updateCharacter(books, n, props) {
  return map(books, (book) => {
    return {
      ...book,
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

export default handleActions({
  'books.select': (state, action) => {
    const id = action.payload;
    return state.map((book) => {
      return { ...book, selected: book.id == id };
    })
  },
  'books.changeID': (state, action) => {
    return updateProps(state, { id: action.payload });
  },
  'books.changeTitle': (state, action) => {
    return updateProps(state, { title: action.payload });
  },
  'books.changeVolume': (state, action) => {
    return updateProps(state, { volume: action.payload });
  },
  'books.addChraracter': (state) => {
    return map(state, (book) => {
      return {
        ...book,
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
}, window.__books__ || []);
