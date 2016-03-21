import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  select: createAction('books.select'),
  changeID: createAction('books.changeID', (e) => e.target.value),
  changeTitle: createAction('books.changeTitle', (e) => e.target.value),
  changeVolume: createAction('books.changeVolume', (e) => e.target.value),
  addCharacter: createAction('books.addChraracter'),
  changeTag: createAction('books.changeTag', (n, e) => {
      return { index: n, value: e.target.value }
  }),
  changeName: createAction('books.changeName', (n, e) => {
      return { index: n, value: e.target.value }
  }),
  changeColor: createAction('books.changeColor', (n, e) => {
      return { index: n, value: e.target.value }
  }),
  save: createAction('books.save', server.saveBook)
}
