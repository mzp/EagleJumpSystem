import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  select: createAction('volume.select', (book_id, volume) => {
    return { book_id, volume }
  }),
  upload: createAction('volume.upload', server.upload),
  textDetect: createAction('volume.text_detect', server.textDetect),
  fetch: createAction('volume.fetch', server.fetch)
}
