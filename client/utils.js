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
}
