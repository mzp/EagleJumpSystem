import { handleActions } from 'redux-actions';
import { updateSelected, move } from '../utils';
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
      if(panel.path == path) {
        return {
          ...panel,
          selected: true,
          editTag: true,
          selectedFace: get(panel, ['faces', 0], null)
        };
      } else {
        return { ...panel, selected: false };
      }
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
  'panels.next': (state, action) => {
    return move(state, 1);
  },
  'panels.prev': (state, action) => {
    return move(state, -1);
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
      const others = get(panel, ['metadata', 'others'], []);
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
