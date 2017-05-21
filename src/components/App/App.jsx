import React from 'react';
import Exercises from '../../services/Exercises';
import Question from '../Question/Question.jsx';
import styles from './App.css';

export default class App extends React.PureComponent {
  constructor() {
    super();

    this.generator = null;

    this._onAnswer = this.onAnswer.bind(this);
    this._onReloadClick = this.onReloadClick.bind(this);

    this.state = {
      correctAnswers: 0,
      incorrectAnswers: 0,
      exercises: []
    };
  }

  componentWillMount() {
    this.generator = new Exercises(this.props.language);

    this.reload();
  }

  onAnswer(correct) {
    this.setState({
      correctAnswers: this.state.correctAnswers + (correct ? 1 : 0),
      incorrectAnswers: this.state.incorrectAnswers + (correct ? 0 : 1)
    });
  }

  reload() {
    this.generator.generate(this.props.pattern)
      .then(data => {
        this.setState({
          correctAnswers: 0,
          incorrectAnswers: 0,
          exercises: data
        })
      });
  }

  onReloadClick() {
    this.reload();

    requestAnimationFrame(() => {
      this.questionsBlock.scrollIntoView();
    });
  }

  render() {
    const allClozes = this.state.exercises
          .map(item => item.find(lexeme => lexeme.occluded != null))
          .filter(Boolean);

    const maxSize = allClozes.reduce((max, item) => {
      return Math.max(max, item.occluded.length);
    }, 1);

    const choices = allClozes.reduce((acc, item) => {
      if (!acc.includes(item.occluded)) acc.push(item.occluded);
      return acc;
    }, []);

    const exercises = this.state.exercises.map((item, i) => (
      <li key={ i } className={ styles.question }>
        <Question
          question={ item }
          size={ maxSize }
          choices={ choices }
          clozeSymbol={ this.generator.clozeSymbol }
          onAnswer={ this._onAnswer }
          />
      </li>
    ));

    const score = this.state.correctAnswers || this.state.incorrectAnswers ? (
      <div className={ styles.score }>
        { this.state.correctAnswers ? (
          <div className={ styles.correctScore }>
            Correct: { this.state.correctAnswers }/{ this.state.exercises.length }
          </div>
        ) : '' }

      { this.state.incorrectAnswers ? (
        <div className={ styles.incorrectScore }>
          Errors: { this.state.incorrectAnswers }
        </div>
      ) : '' }
      </div>
    ) : '';

    return (
      <div className={ styles.container } ref={ (el) => this.questionsBlock = el } >
        <p className={ styles.description }>{ this.props.description }</p>

        <ol>
          { exercises }
        </ol>

        <div className={ styles.controls }>
          <button onClick={ this._onReloadClick }>Load new exercises</button>
        </div>

        { score }
      </div>
    );
  }
}
