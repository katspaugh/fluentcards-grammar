import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import patterns from '../../patterns';
import Header from '../../../shared/components/Header/Header.jsx';
import styles from './HomeRoute.module.css';

export default ({ match }) => {
  const languages = match.params.language ?
    [ match.params.language ] :
    Object.keys(patterns);

  const title = match.params.language ? '' : (
    <div className={ styles.title }>
      <span>Fluentcards Grammar</span>
      <span className={ styles.subtitle }>drills from books and subtitles</span>
    </div>
  );

  const language = match.params.language ? (
    <span>
      <Link to="/grammar">All languages</Link>
      { ' › ' }
      { match.params.language }
    </span>
  ) : '';

  const content = languages.map(language => {
    const links = Object.keys(patterns[language]).map((key, i) => (
      <li key={ i }>
        <Link to={ `/grammar/quiz/${ language }/${ key }` }>{ patterns[language][key].title }</Link>
      </li>
    ));

    return (
      <div className={ styles.languageBlock } key={ language } id={ language }>
        <h2>
          <Link to={ `/grammar/quiz/${ language }` }><h2>{ language }</h2></Link>
        </h2>

        <ul>{ links }</ul>
      </div>
    );
  });

  const homeClasses = classnames(styles.home, {
    [styles.singleLang]: match.params.language
  });

  return (
    <div className={ homeClasses }>
      <section>
        <Header title={ title }>{ language }</Header>
      </section>

      <section>
        <div className={ styles.container }>
          <div className={ styles.content }>
            { content }
          </div>
        </div>
      </section>

      <section>
        <div className={ styles.container }>
          <h1 className={ styles.hero }>
            Refresh any quiz page to load new exercises!
          </h1>

          <p>All <Link to="/grammar/texts">texts</Link> used here are transformed and mixed for educational purposes under the Fair Use.</p>
        </div>
      </section>
    </div>
  );
};
