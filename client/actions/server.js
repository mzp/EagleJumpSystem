import { createAction } from 'redux-actions';
import server from 'gateway/server';

export default {
  upload: createAction('log.batch', server.upload),
  textDetect: createAction('log.batch', server.textDetect),
  faceDetect: createAction('log.batch', server.faceDetect),
  restore: createAction('log.batch', (id) => ({ text: id })),
  infer: createAction('log.batch', server.infer),
  fetch: createAction('log.fetch', server.fetch)
}