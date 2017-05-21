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
    if (nextProps.question !== this.props.question) {
      this.updateChoices(nextProps);
    }
  }

  updateChoices(props) {
    const maxChoices = 4;
    const lexeme = props.question.find(item => item.occluded != null);

    let choices = lexeme.choices || props.choices;
    choices = shuffle(choices.slice()).slice(0, maxChoices);

    const rightChoice = lexeme.occluded.toLowerCase();

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
    const lexeme = this.props.question.find(item => item.occluded != null);
    const correct = lexeme.occluded.toLowerCase() === value.toLowerCase();

    this.setState({ correct, selectedChoice: value });

    this.props.onAnswer(correct, lexeme);
  }

  renderChoices() {
    const lexeme = this.props.question.find(item => item.occluded != null);
    let randomChoices = this.state.choices;

    // When no choices, just display the base form
    if (randomChoices.length <= 1) {
      return (
        <li>{ lexeme.baseForm.join ? lexeme.baseForm.join('') : lexeme.baseForm }</li>
      );
    }

    return randomChoices.map((choice, i) => {
      const key = lexeme.surfaceForm;

      return (
        <li key={ i }>
          <label>
            <input
              type="radio"
              checked={ this.state.selectedChoice === choice }
              disabled={ this.state.correct }
              name={ key }
              value={ choice }
              onChange={ () => this.onChange(choice) } />
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
        this.onChange(e.target.answer.value);
      };

      const input = lexeme.occluded != null ? (
        <form action="#" onSubmit={ onSubmit }>
          <input
            name="answer"
            placeholder="…"
            size={ this.props.size + 1 }
            readOnly={ correct }
            value={ correct ? lexeme.occluded : undefined }
            onBlur={ (e) => this.onChange(e.target.value) }
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
    toggle[styles.correct] = correct === true;
    toggle[styles.incorrect] = correct === false;
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
