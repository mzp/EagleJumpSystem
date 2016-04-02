import { handleActions } from 'redux-actions';
import { updateSelected, move } from '../utils';
import get from 'lodash.get';
import findIndex from 'lodash.findindex';

const PANELS = window.__panels__  || {};

function init(panels) {
  return updateSelected(panels, (panel) => {
    const { metadata: { characters, auto_characters } }  = panel;
    const empty = Array.apply(null, Array(panel.faces.length));
    const next_characters = characters || auto_characters || empty;
    return {
      ...panel,
      metadata: { ...panel.metadata, characters: next_characters },
      editTag: true,
      selectedFace: get(panel, ['faces', 0], null)
    };
  });
}

export function currentPanel(panels) {
  return panels.find((panel) => panel.selected);
}

export function script(panel) {
  return panel.metadata.script || panel.metadata.auto_script || '';
}

export function characters(panel) {
  return panel.metadata.characters || panel.metadata.auto_characters || [];
}

export default handleActions({
  'volume.select': (state, action) => {
    const { book_id, volume }= action.payload;
    return get(window.__panels__, [ book_id, volume ], {})
  },
  'panels.select': (state, action) => {
    const path = action.payload;
    return init(state.map((panel) => ({ ...panel, selected: panel.path == path })));
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
  'panels.next': (state, action) => {
    return init(move(state, 1));
  },
  'panels.prev': (state, action) => {
    return init(move(state, -1));
  },
  'panels.selectFace': (state, action) => {
    return updateSelected(state, (panel) => {
      return { ...panel, selectedFace: action.payload }
    });
  },
  'panels.switch': (state, action) => {
    return updateSelected(state, (panel) => {
      return { ...panel, editTag: !panel.editTag }
    });
  },
  'panels.setTag': (state, action) => {
    return updateSelected(state, (panel) => {
      const { faces, selectedFace, metadata: { characters, ...metadata } } = panel;
      const current = findIndex(faces, (x) => x == selectedFace);
      const next_characters = characters.map((c, i) => {
        if( i == current ) {
          return action.payload
        } else {
          return c;
        }
      });
      const next = (current + 1) % faces.length;

      return {
        ...panel,
        selectedFace: faces[next],
        metadata: {
          ...metadata,
          characters: next_characters
        }
      };
    });
  },
  'panels.setOtherTag': (state, action) => {
    return updateSelected(state, (panel) => {
      const others = panel.metadata.others || [];
      let next_others;
      if( others.includes(action.payload) ) {
        next_others = others.filter((x) => x != action.payload);
      } else {
        next_others = [...others, action.payload];
      }
      return {
        ...panel,
        metadata: {
          ...panel.metadata,
          others: next_others
        }
      };
    });
  }
}, []);
