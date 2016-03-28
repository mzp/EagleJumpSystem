import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  run: createAction('demo.run', server.demo)
}
