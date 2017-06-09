import React from 'react';
import { Link } from 'react-router-dom';
import patterns from '../../services/patterns';
import Header from '../Header/Header.jsx';
import styles from './Home.css';

export default ({ match }) => {
  const languages = match.params.language ?
    [ match.params.language ] :
    Object.keys(patterns);

  const title = match.params.language ? '' : 'Fluentcards Grammar';

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
      <div className={ styles.languageBlock } key={ language }>
        <div>
          <h2>{ language }</h2>
          <ul>{ links }</ul>
        </div>
      </div>
    );
  });

  return (
    <div className={ styles.home }>
      <Header title={ title }>{ language }</Header>

      <div className={ styles.container }>
        <h2>Focused grammar exercises from books and subtitles</h2>

        <p>
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
