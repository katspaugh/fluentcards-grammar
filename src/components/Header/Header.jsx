import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.css';

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className={ styles.container }>
        <header>
          <div className={ styles.logo }>
            <Link to={ '/' }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 28">
                <g fill="#333">
                  <rect x="0"  y="0" width="20" height="28" rx="4" ry="4" />
                  <rect x="24" y="0" width="20" height="28" rx="4" ry="4" />
                  <rect x="48" y="0" width="20" height="28" rx="4" ry="4" />
                </g>
              </svg>
            </Link>
          </div>

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
