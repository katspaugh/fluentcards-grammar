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
  }

  componentWillMount() {
    this.updateChoices(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.updateChoices(nextProps);
    }
  }

  updateChoices(props) {
    const maxChoices = 4;

    let choices = props.cloze.choices || props.choices;
    choices = shuffle(choices.slice()).slice(0, maxChoices);

    const rightChoice = props.cloze.occluded.toLowerCase();

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

  onChange(value) {
    const lexeme = this.props.cloze;
    const correct = lexeme.occluded.toLowerCase() === value.toLowerCase();

    this.setState({ correct, selectedChoice: value });

    this.props.onAnswer(correct, lexeme);
  }

  renderChoices() {
    const lexeme = this.props.cloze;
    let randomChoices = this.state.choices;

    // When no choices, just display the base form
    if (randomChoices.length <= 1) {
      return (
        <li>{ lexeme.baseForm.join ? lexeme.baseForm.join('') : lexeme.baseForm }</li>
      );
    }

    return randomChoices.map((choice, i) => {
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
            onClick={ () => this.onChange(choice) }>
            { choice || '∅' }
          </button>
        </li>
      );
    });
  }

  render() {
    const { correct } = this.state;

    const onSubmit = e => {
      e.preventDefault();
      this.onChange(e.target.answer.value);
    };

    const input = (
      <form action="#" onSubmit={ onSubmit }>
        <input
          name="answer"
          placeholder="…"
          size={ this.props.size + 1 }
          readOnly={ correct }
          value={ correct ? this.props.cloze.occluded : undefined }
          onBlur={ (e) => this.onChange(e.target.value) }
          className={ correct === false ? styles.wrongInput : '' } />
      </form>
    );

    const textParts = this.props.text.split(this.props.clozeSymbol, 2);

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

        <ol className={ styles.choices }>
          { this.renderChoices() }
        </ol>
      </div>
    );
  }
}
