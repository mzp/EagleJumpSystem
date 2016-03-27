import { createAction } from 'redux-actions';

export default {
  select: createAction('panels.select'),
  updateScript: createAction('panels.updateScript', (e) => e.target.value)
}
