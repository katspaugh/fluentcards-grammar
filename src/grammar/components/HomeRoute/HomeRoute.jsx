import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import patterns from '../../services/patterns';
import Header from '../../../shared/components/Header/Header.jsx';
import styles from './HomeRoute.css';

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
      <Link to="/">All languages</Link>
      { ' › ' }
      { match.params.language }
    </span>
  ) : '';

  const content = languages.map(language => {
    const links = Object.keys(patterns[language]).map((key, i) => (
      <li key={ i }>
        <Link to={ `/quiz/${ language }/${ key }` }>{ patterns[language][key].title }</Link>
      </li>
    ));

    return (
      <div className={ styles.languageBlock } key={ language } id={ language }>
        <h2>
          <Link to={ `/quiz/${ language }` }><h2>{ language }</h2></Link>
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
      <Header title={ title }>{ language }</Header>

      <div className={ styles.container }>
        <p className={ styles.foreword }>
          To become fluent in a foreign language, one must deeply internalize its grammatical patterns. Here you can practice with infinite grammar exercises that are dynamically generated from real-world texts.
        </p>

        <div className={ styles.content }>
          { content }
        </div>

        <h1 className={ styles.hero }>
          Refresh any quiz page above to load new exercises!
        </h1>
      </div>
    </div>
  );
};
