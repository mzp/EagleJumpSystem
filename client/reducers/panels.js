import { handleActions } from 'redux-actions';
import { updateSelected } from '../utils';
import get from 'lodash.get';
import findIndex from 'lodash.findindex';

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
  },
  'panels.updateScript': (state, action) => {
    return updateSelected(state, (panel) => (
      {
        ...panel,
        metadata: {
          ...panel.metadata,
          script: action.payload }
      }
    ));
  },
  'panels.saveScript': (state, action) => {
    const current = findIndex(state, (x) => x.selected);
    const next = (current + 1) % state.length;
    return state.map((panel, i) =>
      ({
        ...panel,
        selected: i == next
      }));
  }
}, []);
