import { handleActions } from 'redux-actions';

export default handleActions({
  'log.batch': (state, action) => {
    const id = action.payload.text;
    return { id, log: '' }
  },
  'log.fetch': (state, action) => {
    const content = action.payload.text;
    return { ...state, content }
  },
  'volume.select': (state, action) => {
    return {}
  },
  'characters.select': (state, action) => {
    return {}
  }
}, {});
