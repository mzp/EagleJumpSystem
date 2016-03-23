import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  select: createAction('characters.select'),
  learn: createAction('log.batch', server.learn),
  fetch: createAction('log.fetch', server.fetch)
}
