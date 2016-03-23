import { handleActions } from 'redux-actions';

export default handleActions({
  'volume.select': (_, action) => {
    return action.payload
  }
}, {});
