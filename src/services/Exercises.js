export default class Exercises {
  constructor(language = 'English') {
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
      const occludedLexeme = Object.assign({}, lexeme);
      const captured = match.captured.find(c => c.lexeme === lexeme);

      occludedLexeme.clozeForm = lexeme.surfaceForm;

      if (captured && captured.patternPart.occlusion) {
        occludedLexeme.choices = captured.patternPart.choices;

        occludedLexeme.clozeForm = lexeme.surfaceForm.replace(captured.patternPart.occlusion, group => {
          occludedLexeme.occluded = group;
          return this.clozeSymbol;
        });

        if (occludedLexeme.occluded == null) {
          occludedLexeme.occluded = '';
          occludedLexeme.clozeForm = occludedLexeme.surfaceForm + this.clozeSymbol;
        }

        const regex = new RegExp(occludedLexeme.surfaceForm.replace(/./g, '[$&]'), 'g');
        text = text.replace(regex, occludedLexeme.clozeForm);
      }

      return occludedLexeme;
    });

    return { text, lexemes };
  }

  generate(pattern) {
    return this.getData()
      .then(data => {
        const matches = this.filterSentences(data, pattern);
        const total = matches.length;
        const set = [];

        for (let i = 0; set.length < this.maxExercises && i < this.maxExercises * 100; i++) {
          const match = matches[Math.floor(total * Math.random())];
          if (!set.some(item => item.sentence.text === match.sentence.text)) set.push(match);
        }

        return set.map(match => this.createExercise(match));
      });
  }
}
