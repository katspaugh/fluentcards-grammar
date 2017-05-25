const rnd = (n) => {
  return Math.floor(Math.random() * n);
};

export function shuffle(arr) {
  const len = arr.length;
  for (let i = len - 1; i >= 0; i--) {
    let j = rnd(len);
    [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
  }
  return arr;
}

export function randomItem(arr) {
  return arr[rnd(arr.length)];
}

export function decodePos(pos, language) {
  const mapping = require(`xerox-nlp-client/data/tagset-${ language.toLowerCase() }.json`);
  console.log(mapping);
  return mapping.find(item => item.tag === '+' + pos).description;
}
