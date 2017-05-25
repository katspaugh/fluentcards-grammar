import { randomItem } from './utils';

export default class Exercises {
  constructor(language = 'English') {
    this.clozeSymbol = '⧼…⧽';
    this.language = language;
    this.data = null;
  }

  getData() {
    if (this.data) return Promise.resolve(this.data);

    return fetch(`/data/${ this.language }/tagged.json`)
      .then(resp => resp.json());
  }

  isLexemeMathing(lexeme, pattern) {
    const check = (param) => (
      !pattern[param] ||
        (pattern[param] === lexeme[param]) ||
        (pattern[param] instanceof Array && pattern[param].includes(lexeme[param])) ||
        (pattern[param] instanceof RegExp && pattern[param].test(lexeme[param]))
    );

    return [ 'partOfSpeech', 'baseForm', 'surfaceForm' ].every(check);
  }

  filterSentences(data, pattern) {
    const matches = [];

    data.sentences.forEach(sentence => {
      const { lexemes } = sentence;
      const currentMatch = [];

      for (let i = 0, len = lexemes.length; i < len; i++) {
        const lexeme = lexemes[i];
        const patternPart = pattern[currentMatch.length];

        if (this.isLexemeMathing(lexeme, patternPart)) {
          // Continue matching
          currentMatch.push({ lexeme, patternPart });
        } else {
          // Reset matching
          currentMatch.length = 0;
        }

        if (currentMatch.length === pattern.length) {
          matches.push({
            sentence,
            captured: currentMatch.slice()
          });
          currentMatch.length = 0;
        }
      }
    });

    return matches;
  }

  createExercise(match) {
    let text = match.sentence.text;

    const lexemes = match.sentence.lexemes.map(lexeme => {
      const cloze = Object.assign({}, lexeme);
      const captured = match.captured.find(c => c.lexeme === lexeme);
      cloze.clozeForm = lexeme.surfaceForm;

      if (captured && captured.patternPart.occlusion) {
        cloze.choices = captured.patternPart.choices;

        cloze.clozeForm = lexeme.surfaceForm.replace(captured.patternPart.occlusion, group => {
          cloze.occluded = group;
          return this.clozeSymbol;
        });

        if (cloze.occluded == null) {
          cloze.occluded = '';
          cloze.clozeForm = cloze.surfaceForm + this.clozeSymbol;
        }
      }

      return cloze;
    });

    const clozes = lexemes.filter(lexeme => lexeme.occluded != null);
    const randomCloze = randomItem(clozes);
    const index = lexemes.indexOf(randomCloze);
    const next = lexemes[index + 1];
    const prev = lexemes[index - 1];

    const regex = new RegExp(
      (prev ? `(\\b${ prev.surfaceForm.replace(/./g, '[$&]') }\\s*)` : '(^)') +
      `(${ randomCloze.surfaceForm.replace(/./g, '[$&]') })` +
      (next ? `(?=\\s*${ next.surfaceForm.replace(/./g, '[$&]') })` : '$')
    );
    text = text.replace(regex, '$1' + randomCloze.clozeForm);

    return {
      text,
      cloze: randomCloze
    };
  }

  generate(pattern) {
    return this.getData()
      .then(data => this.filterSentences(data, pattern));
  }
}
