import { handleActions } from 'redux-actions';
import flatten from 'lodash.flatten';
import values from 'lodash.values';
import isEmpty from 'lodash.isempty';
import { script, characters } from 'reducers/panels';

function search(query, xs) {
  var panels = xs;

  if(query.silence) {
    panels =  panels.filter((x) => isEmpty(x.script));
  } else {
    let xs = query.script.split(' ');
    panels =  panels.filter((panel) => xs.every((x) => script(panel).includes(x)));
  }

  if(!isEmpty(query.characters)) {
    panels = panels.filter((panel) => query.characters.every((c) => characters(panel).includes(c)));
  }

  return panels;
}

function exec(state) {
  let panels = search(state, state.data);
  return { ...state, panels };
}

export default handleActions({
  'books.select': (state, action) => {
    const id = action.payload;
    const data = flatten(values(window.__panels__[id]));
    return { data, panels: data };
  },
  'query.script': (state, action) => {
    return exec( { ...state, script: action.payload });
  }
}, { characters: [], script: '', silence: false });
