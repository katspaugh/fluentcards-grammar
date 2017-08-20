import React, { PureComponent } from 'react';
import classnames from 'classnames';
import ExtensionVocab from '../../services/extension-vocab';
import { lookup } from '../../services/lookup';
import Loader from '../../../shared/components/Loader/Loader.jsx';
import HeadWord from '../HeadWord/HeadWord.jsx';
import Definition from '../Definition/Definition.jsx';
import ExportView from '../ExportView/ExportView.jsx';
import Context from '../Context/Context.jsx';
import styles from './Words.css';


/**
 * Words component
 */
export default class Words extends PureComponent {
  constructor() {
    super();

    this.state = {
      deck: null,
      exportType: null,
      isReversed: false
    };

    this._toggleReverse = () => this.setState({ isReversed: !this.state.isReversed });
  }

  exportDeck(exportType) {
    this.setState({ exportType });
  }

  changeWord(item, value) {
    lookup(item.selection, this.props.lang)
      .then(data => {
        ExtensionVocab.updateItem(item, { def: data.def });
      });
  }

  changeDef(item, value) {
    ExtensionVocab.updateItem(item, { def: [
      {
        text: item.selection,
        tr: value.split('; ').map(text => ({ text }))
      }
    ] });
  }

  changeContext(item, value) {
    ExtensionVocab.updateItem(item, { context: value });
  }

  removeItem(item) {
    ExtensionVocab.removeItem(item);
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
    const { deck, exportType } = this.state;

    if (!deck) {
      return (
        <div className={ styles.container }>
          <Loader />
        </div>
      );
    }

    if (exportType) {
      return (
        <div className={ styles.container }>
          <div className={ styles.exporting }>
            <ExportView words={ this.state.deck.words } type={ this.state.exportType } />
          </div>
        </div>
      );
    }

    const words = deck.words.map((item, index) => {
      return (
        <div className={ styles.entry } key={ index }>
          <div className={ classnames(styles.col, styles.count) }>
            { index + 1 }
          </div>

          <div className={ classnames(styles.col, styles.word) }>
            <HeadWord
              lang={ this.props.lang }
              def={ item.def }
              onChange={ val => this.changeWord(item, val) } />
          </div>

          <div className={ classnames(styles.col, styles.definition) }>
            <Definition
              def={ item.def }
              onChange={ val => this.changeDef(item, val) }
            />
          </div>

          <div className={ classnames(styles.col, styles.context) }>
            <Context
              selection={ item.selection }
              context={ item.context }
              onChange={ val => this.changeContext(item, val) }
            />
          </div>

          <div className={ classnames(styles.col, styles.remove) }>
            <button className={ styles.button } onClick={ () => this.removeItem(item) }>×</button>
          </div>
        </div>
      );
    });

    const controls = (
      <div className={ styles.controls }>
        <div className={ styles.spacer } />

        <h4>Download the deck as:</h4>

        <button className={ styles.exportButton } onClick={ () => this.exportDeck('basic') }>
          Anki Basic
        </button>

        <button className={ styles.exportButton } onClick={ () => this.exportDeck('cloze') }>
          Anki Cloze
        </button>

        <button className={ styles.exportButton } onClick={ () => this.exportDeck('plain') }>
          Memrise
        </button>
      </div>
    );

    return (
      <div className={ styles.container }>
        { controls }

        <div className={ styles.words }>
          <div className={ classnames(styles.entry, styles.header) }>
            <div className={ classnames(styles.col, styles.count) }>
              <button className={ styles.button } onClick={ this._toggleReverse }>⇅</button>
            </div>
            <div className={ styles.col }>Word</div>
            <div className={ styles.col }>Definition</div>
            <div className={ classnames(styles.col, styles.centered, styles.contextHeader) }>Context</div>
          </div>

          { this.state.isReversed ? words.reverse() : words }
        </div>

        <div className={ styles.bottom }>
          { controls }
        </div>
      </div>
    );
  }
}
