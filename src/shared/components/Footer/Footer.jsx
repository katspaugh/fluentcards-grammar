import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.css';

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className={ styles.container }>
        <footer>
          All <Link to="/texts">texts</Link> used to create the exercises are either in Public Domain,
          or transformed and mixed for educational purposes under the Fair Use.

          <div className={ styles.credits }>
            <p>
              Created by <a href="https://github.com/katspaugh">@katspaugh</a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
