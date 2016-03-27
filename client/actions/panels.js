import { createAction } from 'redux-actions';
import server from '../gateway/server';

export default {
  select: createAction('panels.select'),
  updateScript: createAction('panels.updateScript', (e) => e.target.value),
  saveScript: createAction('panels.next', server.saveScript),
  saveCharacters: createAction('panels.next', server.saveCharacters),
  next: createAction('panels.next'),
  prev: createAction('panels.prev'),
  selectFace: createAction('panels.selectFace'),
  setTag: createAction('panels.setTag'),
  setOtherTag: createAction('panels.setOtherTag'),
  switchEditArea: createAction('panels.switch')
}
