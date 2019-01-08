import React from 'react';
import styles from './Footer.module.css';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className={ styles.container }>
        <footer>
          <div />Fluentcards, 2017
        </footer>
      </div>
    );
  }
}
