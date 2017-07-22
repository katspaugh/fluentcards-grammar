import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './ComponentName.css';


/**
 * ComponentName component
 */
export default class ComponentName extends PureComponent {
  /**
   * Component Interface
   */
  static propTypes = {
  };

  /**
   * Default properties
   */
  static defaultProps = {
  };

  /**
   * Initialize the state
   */
  constructor() {
    super();

    this.state = {
    };
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className={ styles.container }>
      </div>
    );
  }
}
