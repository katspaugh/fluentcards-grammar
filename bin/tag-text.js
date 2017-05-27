const fs = require('fs');
const path = require('path');
const tokenizer = require('sbd');
const posTag = require('xerox-nlp-client');

const DELIM = '…';
const minLexemes = 7;
const maxLexemes = 25;

const language = process.argv[2];
const inputText = fs.readFileSync(
  path.resolve(`data/${ language }/input.txt`)
).toString();

const inputSentences = tokenizer.sentences(inputText, {
  newline_boundaries : false,
  html_boundaries    : false,
  sanitize           : true,
  allowed_tags       : false,
  abbreviations      : null
});

posTag(inputSentences.join(DELIM + '\n'), language)
  .then(transformData)
  .then(writeResult);

function escapeRegExp(str) {
  return str.replace(/./g, '[$&]');
}

function findSentence(inputText, lexemes) {
  const regexp = new RegExp(
    lexemes.map(lexeme => escapeRegExp(lexeme.surfaceForm)).join('\\s?')
  );
  const match = inputText.match(regexp);
  return match && match[0];
}

function transformData(data) {
  const sentences = data.sentences.reduce((acc, sentence) => {
    let newSentence = [];

    for (var i = 0, len = sentence.length; i < len; i++) {
      const lexeme = sentence[i];
      newSentence.push(lexeme);

      if (lexeme.baseForm === DELIM) {
        newSentence.pop();
        acc.push(newSentence);
        newSentence = [];
      } else if (i === len - 1) {
        acc.push(newSentence);
      }
    }

    return acc;
  }, []);

  delete data.text;

  data.sentences = sentences
    .map(lexemes => ({
      lexemes,
      text: findSentence(inputText, lexemes)
    }))
    .filter(item => {
      if (!item.text) return false;

      const len = item.lexemes.length;
      return len <= maxLexemes && len >= minLexemes;
    });

  // "Zum" gets tagged wrongly as ADV or ADJA
  data.sentences.forEach(sentence => {
    sentence.lexemes.forEach(lexeme => {
      if (lexeme.baseForm === 'zum' && lexeme.partOfSpeech !== 'PREPART') {
        lexeme.baseForm = [
          'zu', 'der'
        ];
        lexeme.partOfSpeech = 'PREPART';
      }
    });
  });

  return data;
}

function writeResult(data) {
  fs.writeFileSync(
    path.resolve(`data/${ language }/tagged.json`),
    JSON.stringify(data, true, 2)
  );
  console.log('Successfully written the tags.');
}
