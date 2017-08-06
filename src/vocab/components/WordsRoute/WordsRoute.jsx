import React from 'react';
import Header from '../../../shared/components/Header/Header.jsx';
import Words from '../Words/Words.jsx';
import config from '../../../config';

/**
 * WordsRoute component
 */
export default ({ match }) => {
  const { lang } = match.params;

  return (
    <div>
      <Header title={ `Fluentcards: ${ config.languages[lang] }` } />

      <Words lang={ lang } />
    </div>
  );
}
