import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Loader from '../../../shared/components/Loader/Loader.jsx';
import Exercises from '../../services/Exercises';
import Scores from '../../services/Scores';
import Question from '../Question/Question.jsx';
import config from '../../../config';
import styles from './Quiz.module.css';

export default class Quiz extends React.PureComponent {
  constructor() {
    super();

    this.generator = null;
    this.allExercises = null;
    this.cachedExercises = null;

    this._onAnswer = this.onAnswer.bind(this);
    this._onReloadClick = this.reload.bind(this);

    this.state = {
      currentExercises: [],
      activeExercise: 0
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

    // Switch the active exercise
    const { activeExercise } = this.state;
    setTimeout(() => {
      this.setState({ activeExercise: activeExercise + 1 });
    }, correct ? 600 : 3000);
  }

  reload() {
    this.setState({
      currentExercises: [],
      activeExercise: 0
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
    const { currentExercises, activeExercise } = this.state;

    const maxSize = currentExercises.reduce((max, item) => {
      return Math.max(max, item.cloze.occluded.length);
    }, 1);

    const choices = currentExercises.reduce((acc, item) => {
      const choice = item.cloze.occluded.toLowerCase();
      if (!acc.includes(choice)) acc.push(choice);
      return acc;
    }, []);

    const questions = currentExercises.map((item, i) => {
      const isActive = i === activeExercise;
      const classes = classnames(styles.question, {
        [styles.activeQuestion]: isActive
      });

      return (
        <li key={ i } className={ classes }>
          <Question
            cloze={ item.cloze }
            text={ item.text }
            size={ maxSize }
            choices={ choices }
            clozeSymbol={ this.generator.clozeSymbol }
            onAnswer={ this._onAnswer }
            isActive={ isActive }
          />
        </li>
      );
    });

    const app = activeExercise === currentExercises.length ? (
      <div className={ styles.results }>
        <p className={ styles.congrats }>
          Great job!
        </p>

        <div className={ styles.controls }>
          <button onClick={ this._onReloadClick }>Load new exercises</button>
        </div>

        <div>
          <i>or</i>
          <p>
            <Link to={ `/grammar/quiz/${ this.props.language }` }>Choose another exercise</Link>
          </p>
        </div>
      </div>
    ) : (
      <div>
        <p className={ styles.description }>
          { this.props.description }
        </p>

        <ol className={ styles.list }>
          { questions }
        </ol>
      </div>
    );

    const quiz = currentExercises.length ? app : (
      <Loader />
    );

    return (
      <div className={ styles.container }>
        { quiz }
      </div>
    );
  }
}
