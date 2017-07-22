import React, { PureComponent } from 'react';
import styles from './Definition.css';


/**
 * Definition component
 */
export default class Definition extends PureComponent {
  /**
   * @return {JSX.Element}
   */
  render() {
    const maxDefs = 2;
    const { def } = this.props;

    const defintions = [];
    def.forEach(item => item.tr.forEach(tr => defintions.push(tr.text)));

    return (
      <div className={ styles.container }>
        { defintions.slice(0, maxDefs).join('; ') }
      </div>
    );
  }
}
