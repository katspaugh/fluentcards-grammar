import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.css';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className={ styles.container }>
        <footer>
          All <Link to="/grammar/texts">texts</Link> used here are transformed and mixed for educational purposes under the Fair Use.
        </footer>
      </div>
    );
  }
}
