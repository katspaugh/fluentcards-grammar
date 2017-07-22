import React from 'react';
import Header from '../../../shared/components/Header/Header.jsx';
import Words from '../Words/Words.jsx';

/**
 * WordsRoute component
 */
export default ({ match }) => {
  return (
    <div>
      <Header title="Words" />

      <Words lang={ match.params.lang } />
    </div>
  );
}
