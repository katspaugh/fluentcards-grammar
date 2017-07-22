import { ReplaySubject } from 'rx-lite';

const Languages = {
  en: 'English',
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  ru: 'Russian',
  cn: 'Chinese',
  ja: 'Japanese'
};

class ExtensionVocab extends ReplaySubject {
  constructor() {
    super(1);

    let count = 100;

    const init = () => {
      const words = window.fluentcards;

      if (words) {
        this.words = words;
        this.onNext(words);
      } else if (count > 0) {
        count -= 1;
        setTimeout(() => init(), 100);
      }
    };

    init();
  }

  /**
   * Get a list of words by language
   *
   * @param {string} lang
   * @returns {any}
   */
  getDeck(lang) {
    return {
      lang,
      language: Languages[lang],
      words: this.words.filter(item => item.language === lang)
    };
  }

  /**
   * Get a list of lists of words
   *
   * @returns {array}
   */
  getDecks() {
    const groups = {};

    this.words.forEach(word => {
      groups[word.language] = groups[word.language] || [];
      groups[word.language].push(word);
    });

    return Object.keys(groups)
      .sort((a, b) => groups[a].length - groups[b].length)
      .map(lang => ({
        lang,
        language: Languages[lang],
        words: groups[lang]
      }));
  }
}

export default new ExtensionVocab();
