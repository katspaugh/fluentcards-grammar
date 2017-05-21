import { shuffle } from './utils';

export default class Exercises {
  constructor(language = 'English') {
    this.minLexemes = 5;
    this.maxLexemes = 50;
    this.maxExercises = 10;
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
      const currentMatch = [];

      for (let i = 0; i < sentence.length; i++) {
        const lexeme = sentence[i];

        if (pattern.looseOrder) {
          pattern.some(patternPart => {
            if (this.isLexemeMathing(lexeme, patternPart)) {
              currentMatch.push({ lexeme, patternPart });
              return true;
            }
            return false;
          });
        } else {
          const patternPart = pattern[currentMatch.length];

          if (!this.isLexemeMathing(lexeme, patternPart)) {
            // Reset matching
            currentMatch.length = 0;
          } else {
            // Continue matching
            currentMatch.push({ lexeme, patternPart });
          }
        }

        if (currentMatch.length === pattern.length) {
          matches.push({
            captured: currentMatch,
            sentence: sentence
          });
          break;
        }
      }
    });

    const filteredMatches = matches.filter(s => s.length <= this.maxLexemes && s.length >= this.minLexemes);
    if (filteredMatches.length >= this.maxExercises) {
      return filteredMatches;
    }

    return matches;
  }

  isSpaceDelimited(lexeme, prevLexeme) {
    const PUNCTIATION = [ 'CM', 'SENT', 'PUNCT' ];
    const LEADING_SPACE_REGEX = /[\[“‘»›(–]/;
    const NO_LEADING_SPACE_REGEX = /^'.+/;
    const NO_TRAILING_SPACE_REGEX = /[\[“‘»›(]$/;

    return prevLexeme &&
      !NO_TRAILING_SPACE_REGEX.test(prevLexeme.surfaceForm) &&
      !NO_LEADING_SPACE_REGEX.test(lexeme.surfaceForm) &&
      (!PUNCTIATION.includes(lexeme.partOfSpeech) ||
       LEADING_SPACE_REGEX.test(lexeme.surfaceForm));
  }

  createExercise(match) {
    return match.sentence.map((lexeme, index) => {
      const question = Object.assign({}, lexeme);
      const captured = match.captured.find(c => c.lexeme === lexeme);

      question.clozeForm = lexeme.surfaceForm;

      if (captured && captured.patternPart.occlusion) {
        question.choices = captured.patternPart.choices;

        question.clozeForm = lexeme.surfaceForm.replace(captured.patternPart.occlusion, group => {
          question.occluded = group;
          return this.clozeSymbol;
        });

        if (question.occluded == null) question.occluded = '';
      }

      if (this.isSpaceDelimited(lexeme, match.sentence[index - 1])) {
        question.clozeForm = ' ' + question.clozeForm;
      }

      return question;
    });
  }

  generate(pattern) {
    return this.getData()
      .then(data => {
        const matches = this.filterSentences(data, pattern);

        return shuffle(matches)
          .slice(0, this.maxExercises)
          .map(match => this.createExercise(match));
      });
  }
}
