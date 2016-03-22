import { handleActions } from 'redux-actions';

export default handleActions({
  'volume.select': (_, action) => {
    return action.payload
  },
  'volume.upload': (state, action) => {
    const log_id = action.payload.text;
    return { ...state, log_id, log: '' }
  },
  'volume.fetch': (state, action) => {
    const log = action.payload.text;
    return { ...state, log }
  }
}, {});
