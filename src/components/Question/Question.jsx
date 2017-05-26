import React from 'react';
import classnames from 'classnames';
import { shuffle } from '../../services/utils';
import styles from './Question.css';


export default class Question extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      choices: null,
      selectedChoice: null,
      correct: null
    };

    this.onChange = e => {
      this.onAnswer(e.target.value);
    };

    this.onSubmit = e => {
      e.preventDefault();
      this.onAnswer(e.target.answer.value);
    };

  }

  componentWillMount() {
    this.updateChoices(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.updateChoices(nextProps);
    }
  }

  setChoices(choices, rightChoice) {
  }

  updateChoices(props) {
    const maxChoices = 4;
    const rightChoice = props.cloze.occluded.toLowerCase();
    let choices = props.cloze.choices || props.choices;

    if (choices instanceof Function) {
      choices = choices(props.cloze);
    }

    choices = shuffle(choices.slice()).slice(0, maxChoices);

    if (!choices.map(c => c.toLowerCase()).includes(rightChoice)) {
      if (choices.length < maxChoices) {
        choices.push(rightChoice);
        choices = shuffle(choices);
      } else {
        choices[Math.floor(choices.length * Math.random())] = rightChoice;
      }
    }

    this.setState({ choices, correct: null, selectedChoice: null });
  }

  onAnswer(value) {
    const lexeme = this.props.cloze;
    const correct = lexeme.occluded.toLowerCase() === value.toLowerCase();

    this.setState({ correct, selectedChoice: value });

    this.props.onAnswer(correct, lexeme);
  }

  renderChoices() {
    const { choices } = this.state;

    if (!choices || choices.length <= 1) return null;

    return choices.map((choice, i) => {
      const selected = this.state.selectedChoice === choice

      const toggle = {};
      toggle[styles.selectedChoice] = selected;
      toggle[styles.correctChoice] = selected && this.state.correct;
      toggle[styles.incorrectChoice] = selected && !this.state.correct;

      return (
        <li key={ i }>
          <button
            className={ classnames(styles.choiceButton, toggle) }
            disabled={ this.state.correct }
            onClick={ () => this.onAnswer(choice) }>
            { choice || '∅' }
          </button>
        </li>
      );
    });
  }

  render() {
    const { cloze } = this.props;
    const { correct } = this.state;

    const choices = this.renderChoices();

    const choicesBlock = choices ? (
      <ol className={ styles.choices }>
        { choices }
      </ol>
    ) : '';

    const placeholder = choices ? '…' :
      (cloze.baseForm.join ? cloze.baseForm.join('') : cloze.baseForm)

    const input = (
      <form action="#" onSubmit={ this.onSubmit }>
        <input
          name="answer"
          placeholder={ placeholder }
          size={ this.props.size + 1 }
          readOnly={ correct }
          value={ correct ? this.props.cloze.occluded : undefined }
          onChange={ this.onChange }
          className={ correct === false ? styles.wrongInput : '' } />
      </form>
    );

    const textParts = this.props.text.split(this.props.clozeSymbol, 2);
    textParts[0] = textParts[0].slice(0, 1).toUpperCase() + textParts[0].slice(1);

    const toggle = {};
    toggle[styles.correct] = correct === true;
    toggle[styles.incorrect] = correct === false;
    const classes = classnames(styles.container, toggle);

    return (
      <div className={ classes }>
        <div className={ styles.question }>
          { textParts[0] }
          { input }
          { textParts[1] }
        </div>

      { choicesBlock }
      </div>
    );
  }
}
