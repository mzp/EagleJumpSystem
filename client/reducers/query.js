import { handleActions } from 'redux-actions';
import flatten from 'lodash.flatten';
import values from 'lodash.values';
import isEmpty from 'lodash.isempty';
import uniq from 'lodash.uniq';
import { script, characters } from 'reducers/panels';

const PANELS = window.__panels__  || {};

function search(query, xs) {
  var panels = xs;

  if(query.silence) {
    panels =  panels.filter((panel) => isEmpty(script(panel)));
  } else {
    let xs = query.script.split(' ');
    panels =  panels.filter((panel) => xs.every((x) => script(panel).includes(x)));
  }

  if(!isEmpty(query.tags)) {
    panels = panels.filter((panel) => query.tags.every((tag) => characters(panel).includes(tag)));
  }

  return panels;
}

function normalize(state) {
  const { tags } = state;
  const new_tags = tags.filter((tag) => !isEmpty(tag));

  return { ...state, tags: uniq(new_tags) };
}

function exec(state) {
  let panels = search(normalize(state), state.data);
  return { ...state, panels };
}

export default handleActions({
  'books.select': (state, action) => {
    const id = action.payload;
    const data = flatten(values(PANELS[id]));
    return { data, panels: data, tags: [], script: '', silence: false };
  },
  'query.script': (state, action) => {
    return exec({ ...state, script: action.payload });
  },
  'query.tag': (state, action) => {
    const { tag , value } = action.payload;
    const tags = value ?  [ ...state.tags, tag ] : state.tags.filter((x) => x != tag);
    return exec({ ...state, tags });
  },
  'query.silence': (state, action) => {
    const silence = action.payload;
    return exec({ ...state, silence });
  },
  'query.restore': (state, action) => {
    const { script, silence, tags } = action.payload;
    return normalize({ ...state, script, silence, tags });
  }
}, {});
