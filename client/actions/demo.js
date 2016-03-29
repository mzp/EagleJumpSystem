import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  run: createAction('demo.run', (book_id, image, f) => {
    return server.demo(book_id, image)
      .then((response) => {
        f();
        return response
      })
  })
}
