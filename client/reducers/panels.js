import { handleActions } from 'redux-actions';
import get from 'lodash.get';

const PANELS = window.__panels__  || {};

export default handleActions({
  'volume.select': (state, action) => {
    const { book_id, volume }= action.payload;
    return get(window.__panels__, [ book_id, volume ], {})
  },
  'panels.select': (state, action) => {
    const path = action.payload;
    return state.map((panel) => {
      return { ...panel, selected: panel.path == path };
    })
  }
}, []);
