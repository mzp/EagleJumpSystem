import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  select: createAction('panels.select'),
  updateScript: createAction('panels.updateScript', (e) => e.target.value),
  saveScript: createAction('panels.saveScript', server.saveScript)
}
