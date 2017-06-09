import React from 'react';
import { shuffle } from '../../services/utils';
import Exercises from '../../services/Exercises';
import Question from '../Question/Question.jsx';
import Loader from '../Loader/Loader.jsx';
import styles from './App.css';

export default class App extends React.PureComponent {
  constructor() {
    super();

    this.maxExercises = 15;
    this.generator = null;

    this._onAnswer = this.onAnswer.bind(this);
    this._onReloadClick = this.reload.bind(this);

    this.state = {
      correctAnswers: 0,
      incorrectAnswers: 0,
      allExercises: [],
      currentExercises: []
    };
  }

  init() {
    this.generator = new Exercises(this.props.language);

    this.generator.generate(this.props.pattern)
      .then(allExercises => this.setState({ allExercises }, () => this.reload()));
  }

  onAnswer(correct) {
    this.setState({
      correctAnswers: this.state.correctAnswers + (correct ? 1 : 0),
      incorrectAnswers: this.state.incorrectAnswers + (correct ? 0 : 1)
    });
  }

  reload() {
    this.setState({
      currentExercises: [],
      correctAnswers: 0,
      incorrectAnswers: 0
    });

    const { allExercises } = this.state;
    const currentExercises = [];
    const maxTries = 100;

    for (let i = 0; i < maxTries && currentExercises.length < this.maxExercises; i++) {
      const match = allExercises[Math.floor(Math.random() * allExercises.length)];
      if (!currentExercises.some(item => item.originalText === match.sentence.text)) {
        currentExercises.push(this.generator.createExercise(match));
      }
    }

    // Delay the rendering to display the loading animation
    setTimeout(() => {
      this.setState({ currentExercises });
    }, 100);
  }

  componentWillMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pattern !== nextProps.pattern) {
      this.init();
    }
  }

  render() {
    const { currentExercises } = this.state;

    const maxSize = currentExercises.reduce((max, item) => {
      return Math.max(max, item.cloze.occluded.length);
    }, 1);

    const choices = currentExercises.reduce((acc, item) => {
      const choice = item.cloze.occluded.toLowerCase();
      if (!acc.includes(choice)) acc.push(choice);
      return acc;
    }, []);

    const questions = currentExercises.map((item, i) => (
      <li key={ i } className={ styles.question }>
        <Question
          cloze={ item.cloze }
          text={ item.text }
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
            Correct: { this.state.correctAnswers }/{ this.maxExercises }
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
      <div className={ styles.container }>
        <p className={ styles.description }>
          { this.props.description }
          <br />
          Refresh the page to get new exercises.
        </p>

        { currentExercises.length ? (
          <div>
            <ol className={ styles.list }>
              { questions }
            </ol>

            <div className={ styles.controls }>
              <button onClick={ this._onReloadClick }>Load new exercises</button>
            </div>
          </div>
        ) : (
          <Loader />
        ) }

        { score }
      </div>
    );
  }
}
