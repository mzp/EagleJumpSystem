import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  select: createAction('volume.select', (book_id, volume) => {
    return { book_id, volume }
  }),
  upload: createAction('log.batch', server.upload),
  textDetect: createAction('log.batch', server.textDetect),
  faceDetect: createAction('log.batch', server.faceDetect),
  fetch: createAction('log.fetch', server.fetch)
}
