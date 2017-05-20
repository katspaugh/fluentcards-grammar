import React from 'react';
import classnames from 'classnames';
import { shuffle } from '../../services/utils';
import styles from './Question.css';

export default class Question extends React.PureComponent {
  constructor() {
    super();

    this.maxChoices = 4;
    this.randomChoices = null;

    this.state = {
      correct: null
    };
  }

  onChange(lexeme, choice) {
    const correct = lexeme.occluded.toLowerCase() === choice.toLowerCase();

    this.props.onAnswer(correct);

    this.setState({ correct });
  }

  getRandomChoices(lexeme) {
    if (this.randomChoices) {
      return this.randomChoices;
    }

    let choices = lexeme.choices || this.props.choices;
    choices = shuffle(choices.slice()).slice(0, this.maxChoices);

    if (!choices.map(c => c.toLowerCase()).includes(lexeme.occluded.toLowerCase())) {
      choices[Math.floor(choices.length * Math.random())] = lexeme.occluded.toLowerCase();
    }

    this.randomChoices = choices;

    return this.randomChoices;
  }

  renderChoices() {
    const lexeme = this.props.question.find(item => item.occluded != null);
    let randomChoices = this.getRandomChoices(lexeme);

    // When no choices, just display the base form
    if (randomChoices.length <= 1) {
      return (
        <li>{ lexeme.baseForm }</li>
      );
    }

    return randomChoices.map((choice, i) => {
      const key = lexeme.surfaceForm;

      return (
        <li key={ i }>
          <label>
            <input
              type="radio"
              disabled={ this.state.correct }
              name={ key }
              value={ choice }
              onChange={ () => this.onChange(lexeme, choice) } />
              { choice || '∅' }
          </label>
        </li>
      );
    });
  }

  render() {
    const { correct } = this.state;

    const lexemes = this.props.question.map((lexeme, i) => {
      const clozeForm = lexeme.clozeForm.replace(this.props.clozeSymbol, '');

      const onSubmit = e => {
        e.preventDefault();
        this.onChange(lexeme, e.target.answer.value);
      };

      const input = lexeme.occluded != null ? (
        <form action="#" onSubmit={ onSubmit }>
          <input
            name="answer"
            placeholder="…"
            size={ this.props.size + 1 }
            readOnly={ correct }
            value={ correct ? lexeme.occluded : undefined }
            onBlur={ (e) => this.onChange(lexeme, e.target.value) }
            className={ correct === false ? styles.wrongInput : '' } />
        </form>
      ) : '';

      return (
        <span key={ i }>
          { clozeForm }
          { input }
        </span>
      );
    });

    const toggle = {};
    toggle[styles.correct] = this.state.correct === true;
    toggle[styles.incorrect] = this.state.correct === false;
    const classes = classnames(styles.container, toggle);

    return (
      <div className={ classes }>
        <div className={ styles.question }>{ lexemes }</div>

        <ol className={ styles.choices }>
          { this.renderChoices() }
        </ol>
      </div>
    );
  }
}
