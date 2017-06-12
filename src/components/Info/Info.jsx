import React from 'react';
import Scores from '../../services/Scores';
import config from '../../config';
import styles from './Info.css';

export default class Info extends React.Component {
  constructor() {
    super();

    this.state = {
      scores: null,
      currentScore: null
    };
  }

  onUpdate(scores) {
    let currentScore = scores[scores.length - 1];

    if (currentScore && currentScore.correctAnswers === config.maxExercises) {
      if (currentScore === this.state.currentScore) {
        setTimeout(() => {
          this.setState({ currentScore: null });
        }, 3000);
      } else {
        currentScore = null;
      }
    }

    this.setState({ scores, currentScore });
  }

  componentDidMount() {
    this.sub = Scores.subject.subscribe(scores => {
      this.onUpdate(scores);
    });
  }

  componentWillUnmount() {
    this.sub.dispose();
  }

  render() {
    const { scores, currentScore } = this.state;
    if (!scores || !scores.length) return null;

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const sum = scores
      .filter(score => {
        return score.finished >= weekAgo
      })
      .reduce((sum, score) => {
        sum.correctAnswers += score.correctAnswers;
        sum.errors += score.errors;
        return sum;
      }, { correctAnswers: 0, errors: 0 });

    const totalPercents = Math.round(100 - (sum.errors / sum.correctAnswers) * 100);
    const confidence = Math.round(15 - (sum.correctAnswers / 1000) * 100);

    const displayScores = currentScore ? (
      <div>
        <span>
          Correct: { currentScore.correctAnswers }/{ config.maxExercises }
        </span>
        { ' ' }
        <span>
          Errors: { currentScore.errors }
        </span>
      </div>
    ) : (
      <div>
        Total: { totalPercents }% (±{ confidence }%)
      </div>
    );

    return (
      <div className={ styles.container }>
        { displayScores }
      </div>
    );
  }
}
