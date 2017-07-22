import React, { PureComponent } from 'react';
import styles from './HeadWord.css';


function getArticle(data, lang) {
  const articles = {
    de: {
      pl: 'die',
      m: 'der',
      f: 'die',
      n: 'das'
    }
  };

  return articles[lang] ? articles[lang][data.num] || articles[lang][data.gen] : null;
}


/**
 * HeadWord component
 */
export default class HeadWord extends PureComponent {
  /**
   * @return {JSX.Element}
   */
  render() {
    const data = this.props.def[0];

    const article = getArticle(data, this.props.lang);

    const extra = (data.fl || data.num || data.gen) ? (
      <span className={ styles.extra }>
        <span className={ styles.fl }>{ data.fl || '' }</span>
        { data.fl && (data.num || data.gen) ? ', ' : '' }
        <span className={ styles.gen }>{ data.num || data.gen || '' }</span>
      </span>
    ) : '';

    const transcription = data.ts ? (
      <span className={ styles.ts }>{ `${ data.ts }` }</span>
    ) : '';

    return (
      <div className={ styles.container }>
        <div className={ styles.word }>
          { article ? (
            <span>
              { article }&nbsp;{ data.text }
            </span>
          ) : (
            <span>
              { data.text }
            </span>
          ) }

          { ' ' }

          { extra || transcription }
        </div>

        { extra ? (
          <div className={ styles.tsBlock }>{ transcription }</div>
        ) : '' }
      </div>
    );
  }
}
