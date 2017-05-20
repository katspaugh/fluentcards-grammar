export function shuffle(arr) {
  const rnd = (n) => {
    return Math.floor(Math.random() * n);
  };

  const len = arr.length;
  for (let i = len - 1; i >= 0; i--) {
    let j = rnd(len);
    [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
  }
  return arr;
}
