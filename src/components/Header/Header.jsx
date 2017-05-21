import React from 'react';
import styles from './Header.css';

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className={ styles.container }>
        <header>
          <h1>
            { this.props.children }
            { ' ' }
            { this.props.title }
          </h1>
        </header>
      </div>
    );
  }
}
