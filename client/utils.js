import findIndex from 'lodash.findindex';

export function updateSelected(xs, f) {
  return xs.map((x) => {
    if(x.selected) {
      return f(x);
    } else {
      return x;
    }
  });
}

export function nameOfTag(book, tag) {
  const character = book.characters.find((character) => character.tag == tag);
  if (character) {
    return character.name
  }
  return tag;
}

export function selectedClassName(name, selected) {
  return name + ' ' + (selected ? name+'-selected' : '');
}

export function move(xs, n) {
  const current = findIndex(xs, (x) => x.selected);
  const next = (xs.length + current + n) % xs.length;
  return xs.map((x, i) => ({ ...x, selected: i == next }));
}
