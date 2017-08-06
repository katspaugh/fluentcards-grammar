import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ExtensionVocab from '../../services/extension-vocab';
import styles from './Decks.css';

/**
 * Decks component
 */
export default class Decks extends PureComponent {
  /**
   * Initialize the state
   */
  constructor() {
    super();

    this.state = {
      wordGroups: null
    };
  }

  componentWillMount() {
    this.sub = ExtensionVocab
      .subscribe(() => {
        this.setState({ wordGroups: ExtensionVocab.getDecks() });
      });
  }

  componentWillUnmount() {
    this.sub.dispose();
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    if (!this.state.wordGroups) return (
      <div className={ styles.container }>
        <h1 className={ styles.heading }>
          <a target="_blank"
             rel="nofollow"
             href="https://chrome.google.com/webstore/detail/fluentcards-dictionary/fdppeilamokmgmobedkdmjiedkbblngd">
            Install our Chrome extension
          </a>
        </h1>

        <p className={ styles.paragraph }>
          <a target="_blank"
             rel="nofollow"
             href="https://chrome.google.com/webstore/detail/fluentcards-dictionary/fdppeilamokmgmobedkdmjiedkbblngd">
            <img src="/images/extension.png" />
          </a>

          <span>
            Install our Chrome extension for instant dictionary look-up.
            Start collecting flashcards to build up your vocabulary.
          </span>
        </p>
      </div>
    );

    const decks = this.state.wordGroups.map(group => {
      return (
        <Link to={ `/vocab/${ group.lang }` } className={ styles.deck }>
          <h3>{ group.language }</h3>

          <p>{ group.words.length } words</p>
        </Link>
      );
    });

    return (
      <div className={ styles.container }>
        <div className={ styles.decks }>
          { decks }
        </div>
      </div>
    );
  }
}
