import { randomItem, escapeRegexp } from '../../shared/services/Utils';

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
    const check = (param) => {
      let value = lexeme[param];
      if (value instanceof Array) value = value.join('');

      return !pattern[param] ||
        (pattern[param] === value) ||
        (pattern[param] instanceof Array && pattern[param].includes(value)) ||
        (pattern[param] instanceof RegExp && pattern[param].test(value));
    };

    return [ 'partOfSpeech', 'baseForm', 'surfaceForm' ].every(check);
  }

  filterSentences(data, pattern) {
    const matches = [];

    data.sentences.forEach(sentence => {
      let captured = [];

      sentence.lexemes.forEach(lexeme => {
        const patternPart = pattern[captured.length];

        if (this.isLexemeMathing(lexeme, patternPart)) {
          // Continue matching
          captured.push({ lexeme, patternPart });
        } else {
          // Reset matching
          captured = [];
        }

        if (captured.length === pattern.length) {
          matches.push({ sentence, captured });
          captured = [];
        }
      });
    });

    return matches;
  }

  createExercise(match) {
    let text = match.sentence.text;

    const lexemes = match.sentence.lexemes.map(lexeme => {
      const cloze = Object.assign({}, lexeme);
      const captured = match.captured.find(c => c.lexeme === lexeme);

      if (captured && captured.patternPart.occlusion) {
        cloze.clozeForm = lexeme.surfaceForm.replace(captured.patternPart.occlusion, group => {
          cloze.occluded = group;
          return this.clozeSymbol;
        });

        if (cloze.occluded == null) {
          cloze.occluded = '';
          cloze.clozeForm = cloze.surfaceForm + this.clozeSymbol;
        }

        cloze.choices = captured.patternPart.choices;
      }

      return cloze;
    });

    const clozes = lexemes.filter(lexeme => lexeme.occluded != null);
    const randomCloze = randomItem(clozes);
    const index = lexemes.indexOf(randomCloze);
    const next = lexemes[index + 1];
    const prev = lexemes[index - 1];

    const regex = new RegExp(
      (prev ? `(${ escapeRegexp(prev.surfaceForm) }\\s*)` : '(^)') +
      escapeRegexp(randomCloze.surfaceForm) +
      (next ? `(?=\\s*${ escapeRegexp(next.surfaceForm) })` : '$')
    );
    text = text.replace(regex, '$1' + randomCloze.clozeForm);

    return {
      text,
      originalText: match.sentence.text,
      cloze: randomCloze
    };
  }

  generate(pattern) {
    return this.getData()
      .then(data => this.filterSentences(data, pattern));
  }
}
