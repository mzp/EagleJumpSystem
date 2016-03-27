import { handleActions } from 'redux-actions';
import { updateSelected, move } from '../utils';
import get from 'lodash.get';
import zip from 'lodash.zip';

const PANELS = window.__panels__  || {};

export default handleActions({
  'volume.select': (state, action) => {
    const { book_id, volume }= action.payload;
    const panels = get(window.__panels__, [ book_id, volume ], {});

    return { ...state, panels }
  },

  'panels.select': (state, action) => {
    const { panels } = state;
    const path = action.payload;
    const panel = panels.find((panel) => {
      return panel.path == path;
    });

    const faces = zip(
        panel.faces,
        panel.metadata.characters || panel.metadata.auto_characters
      ).map( ([path, tag], index) => ({ path, tag, selected: index == 0 }));

    return {
      ...state,
      faces: faces,
      others: panel.metadata.others
    }
  },

  'faces.select': (state, action) => {
    const { path } = action.payload;
    const faces = state.faces.map((face) => ({ ...face, selected: face.path == path }));
    return { ...state, faces }
  },

  'faces.setTag': (state, action) => {
    const faces = updateSelected(state.faces, (face) => ({
      ...face,
      tag: action.payload
    }));

    return { ...state, faces: move(faces, 1) };
  }
}, {});
