import React, { PureComponent } from 'react';
import ExtensionVocab from '../../services/ExtensionVocab';
import Loader from '../../../shared/components/Loader/Loader.jsx';
import HeadWord from '../HeadWord/HeadWord.jsx';
import Definition from '../Definition/Definition.jsx';
import Context from '../Context/Context.jsx';
import styles from './Words.css';


/**
 * Words component
 */
export default class Words extends PureComponent {
  constructor() {
    super();

    this.state = {
      deck: null
    };
  }

  componentWillMount() {
    this.sub = ExtensionVocab.subscribe(() => {
      this.setState({
        deck: ExtensionVocab.getDeck(this.props.lang)
      });
    });
  }

  componentWillUnmount() {
    this.sub.dispose();
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    const { deck } = this.state;

    if (!deck) {
      return (
        <div className={ styles.container }>
          <Loader />
        </div>
      );
    }

    const words = deck.words.map(item => {
      return (
        <div className={ styles.entry }>
          <div className={ styles.word }>
            <HeadWord lang={ this.props.lang } def={ item.def } />
          </div>

          <div className={ styles.definition }>
            <Definition def={ item.def } />
          </div>

          <div className={ styles.context }>
            <Context selection={ item.selection } context={ item.context } />
          </div>
        </div>
      );
    });

    return (
      <div className={ styles.container }>
        <h2>{ deck.language }</h2>

        <div className={ styles.words }>
          { words }
        </div>
      </div>
    );
  }
}
