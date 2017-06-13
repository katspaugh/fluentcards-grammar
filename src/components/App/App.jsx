import React from 'react';
import { shuffle } from '../../services/utils';
import Exercises from '../../services/Exercises';
import Scores from '../../services/Scores';
import Question from '../Question/Question.jsx';
import Loader from '../Loader/Loader.jsx';
import config from '../../config';
import styles from './App.css';

export default class App extends React.PureComponent {
  constructor() {
    super();

    this.generator = null;
    this.allExercises = null;
    this.cachedExercises = null;

    this._onAnswer = this.onAnswer.bind(this);
    this._onReloadClick = this.reload.bind(this);

    this.state = {
      currentExercises: []
    };
  }

  init() {
    this.generator = new Exercises(this.props.language);

    this.generator.generate(this.props.pattern)
      .then(allExercises => {
        this.cachedExercises = allExercises;
        this.allExercises = allExercises.slice();
        this.reload();
      });
  }

  onAnswer(correct) {
    Scores.update(
      this.props.language,
      this.props.patternSlug,
      correct
    );
  }

  reload() {
    this.setState({
      currentExercises: []
    });

    const currentExercises = [];
    const maxTries = 100;

    for (let i = 0; i < maxTries && currentExercises.length < config.maxExercises; i++) {
      const randomIndex = Math.floor(Math.random() * this.allExercises.length);
      const match = this.allExercises[randomIndex];
      if (!currentExercises.some(item => item.originalText === match.sentence.text)) {
        currentExercises.push(this.generator.createExercise(match));
        this.allExercises.splice(randomIndex, 1);

        if (this.allExercises.length < config.maxExercises - currentExercises.length) {
          this.allExercises = this.cachedExercises.slice();
        }
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

  componentWillUnmount() {
    Scores.reset();
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

    const quiz = currentExercises.length ? (
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
    );

    return (
      <div className={ styles.container }>
        <p className={ styles.description }>
          { this.props.description }
        </p>

        { quiz }
      </div>
    );
  }
}
