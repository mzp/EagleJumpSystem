import { createAction } from 'redux-actions';

export default {
  select: createAction('faces.select'),
  setTag: createAction('faces.setTag'),
  setOtherTag: createAction('faces.setOtherTag'),
  switchEditArea: createAction('faces.switch')
}
