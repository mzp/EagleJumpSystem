export function updateSelected(xs, f) {
  return xs.map((x) => {
    if(x.selected) {
      return f(x);
    } else {
      return x;
    }
  });
}
