function toArray(item) {
  return item instanceof Array ? item : [ item ];
}

function transformData(data) {
  const sentence = data.MorphoAnalysisResponse.MorphoAnalysisResult.file.sentence;
  const lexeme = toArray(sentence['lexeme-list'])[0].lexeme;
  const sense = toArray(toArray(lexeme['sense-list'])[0].sense)[0];
  const baseForm = toArray(sense['base-form']['#text'] || sense['base-form']);
  const morphemes = baseForm
    .filter(item => item !== '&')
    .map(item => item.replace(/lt;|gt;|[{}]/g, ''));

  return morphemes;
}

export function analyze(word, language) {
  const endpoint = 'https://services.open.xerox.com/bus/op/fst-nlp-tools/MorphoAnalysis?format=json';
  const url = `${ endpoint }&&inputtext=${ word }&language=${ language }`;

  return fetch(url)
    .then(resp => resp.json())
    .then(transformData);
}
