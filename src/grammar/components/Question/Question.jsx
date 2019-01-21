import React from 'react';
import classnames from 'classnames';
import { shuffle } from '../../../shared/services/Utils';
import styles from './Question.module.css';


export default class Question extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      choices: null,
      selectedChoice: null,
      correct: null,
      showHint: false
    };

    this.input = null;

    this.onInput = () => {
      if (this.state.correct === false) {
        this.setState({ correct: null });
      }
    };

    this.onSubmit = e => {
      e.preventDefault();
      this.onAnswer(e.target.answer.value);
    };
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

    this.setState({
      choices,
      correct: null,
      selectedChoice: null,
      showHint: false
    });
  }

  onAnswer(value) {
    const lexeme = this.props.cloze;
    const correct = lexeme.occluded.toLowerCase() === value.toLowerCase();

    this.setState({ correct, selectedChoice: value });

    this.props.onAnswer(correct, lexeme);

    !correct && setTimeout(() => {
      this.setState({ showHint: true });
    }, 600)
  }

  renderChoices() {
    const { choices, correct, showHint } = this.state;

    if (!choices || choices.length <= 1) return null;

    const correctChoice = this.props.cloze.occluded;

    return choices.map((choice, i) => {
      const selected = this.state.selectedChoice === choice;

      const extraClasses = {};
      extraClasses[styles.selectedChoice] = selected;
      extraClasses[styles.correctChoice] = selected && correct;
      extraClasses[styles.incorrectChoice] = selected && !correct;
      extraClasses[styles.hintChoice] = showHint && choice === correctChoice;

      return (
        <li key={ i }>
          <button
            className={ classnames(styles.choiceButton, extraClasses) }
            disabled={ this.state.selectedChoice != null }
            onClick={ () => this.onAnswer(choice) }>
            { choice || '∅' }
          </button>
        </li>
      );
    });
  }

  setFocus() {
    if (this.props.isActive && this.input) {
      this.input.focus();
    }
  }

  componentWillMount() {
    this.updateChoices(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.updateChoices(nextProps);
    }
  }

  componentDidMount() {
    this.setFocus();
  }

  componentDidUpdate() {
    this.setFocus();
  }

  render() {
    const { cloze, text, size } = this.props;
    const { correct, showHint } = this.state;

    const correctAnswer = cloze.occluded;
    const choices = this.renderChoices();

    const choicesBlock = choices ? (
      <ol className={ styles.choices }>
        { choices }
      </ol>
    ) : '';

    const placeholder = choices ? '…' :
      (cloze.baseForm.join ? cloze.baseForm.join('') : cloze.baseForm);

    const hint = showHint && !choices ? (
      <span className={ styles.hintAnswer }>{ correctAnswer }</span>
    ) : null;

    const input = (
      <form action="#" onSubmit={ this.onSubmit }>
        { hint }
        <input
          ref={ el => this.input = el }
          name="answer"
          disabled={ correct === false }
          placeholder={ placeholder }
          size={ size + 1 }
          readOnly={ correct }
          onInput={ this.onInput }
          defaultValue={ (correct || (showHint && choices)) ? correctAnswer : null } />
      </form>
    );

    const textParts = text.split(this.props.clozeSymbol, 2);
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
