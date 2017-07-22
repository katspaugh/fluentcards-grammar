import React, { PureComponent } from 'react';
import { escapeRegexp } from '../../../shared/services/utils';
import styles from './Context.css';


/**
 * Context component
 */
export default class Context extends PureComponent {
  /**
   * @return {JSX.Element}
   */
  render() {
    const { context, selection } = this.props;

    const text = context.replace(/^" /, '').trim();

    let parts = text.split(new RegExp('\\b' + escapeRegexp(selection) + '\\b'));
    if (parts.length === 1) {
      parts = text.split(selection);
    }

    return (
      <div className={ styles.container }>
        { parts.length > 1 ? (
          <span>
            { parts[0] }<b>{ selection }</b>{ parts[1] }
          </span>
        ) : parts[0] }
      </div>
    );
  }
}
