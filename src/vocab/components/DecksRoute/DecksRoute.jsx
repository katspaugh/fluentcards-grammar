import React from 'react';
import Header from '../../../shared/components/Header/Header.jsx';
import Decks from '../Decks/Decks.jsx';

/**
 * DecksRoute component
 */
export default ({ match }) => {
  return (
    <div>
      <Header title={ 'Vocabulary decks' }></Header>
      <Decks />
    </div>
  );
};
