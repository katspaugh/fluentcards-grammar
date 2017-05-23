const fs = require('fs');
const path = require('path');
const posTag = require('xerox-nlp-client');


const language = process.argv[2];
const input = fs.readFileSync(
  path.resolve(`data/${ language }/input.txt`)
).toString();

posTag(input, language)
  .then(transformData)
  .then(writeResult);

function writeResult(data) {
  fs.writeFileSync(
    path.resolve(`data/${ language }/tagged.json`),
    JSON.stringify(data, true, 2)
  );
  console.log('Successfully written the tags.');
}

function transformData(data) {
  const minLexemes = 5;
  const maxLexemes = 35;

  const SENTENCE_FINAL_PUNCT = 'SENT';
  const CLOSING_QUOTE = /^[«‹”’`'")\]]/;

  delete data.text;

  data.sentences = data.sentences.reduce((acc, sentence) => {
    let newSentence = [];

    for (var i = 0, len = sentence.length; i < len; i++) {
      const lexeme = sentence[i];
      newSentence.push(lexeme);

      if (i === len - 1) {
        acc.push(newSentence);

        if (CLOSING_QUOTE.test(newSentence[0].surfaceForm)) {
          newSentence.shift();
        }
      }
      else if (lexeme.partOfSpeech === SENTENCE_FINAL_PUNCT) {
        acc.push(newSentence);

        if (CLOSING_QUOTE.test(newSentence[0].surfaceForm)) {
          newSentence.shift();
        }

        newSentence = [];
      }
    }

    return acc;
  }, []);

  data.sentences = data.sentences.filter(sentence => (
    sentence.length <= maxLexemes && sentence.length >= minLexemes
  ));

  return data;
}
