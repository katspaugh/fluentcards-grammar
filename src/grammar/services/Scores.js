import { ReplaySubject } from 'rx-lite';
import User from '../../shared/services/User';
import config from '../../config';

const subject = new ReplaySubject(1);
const scores = [];
let currentScore = null;

export default class Scores {
  static subject;

  /**
   * @param {array} newScores
   */
  static setScores(newScores) {
    scores.length = 0;
    scores.push.apply(scores, newScores);
    subject.onNext(scores);
  }

  static reset() {
    if (currentScore) {
      currentScore = null;
      scores.pop();
    }
    this.subject.onNext(scores);
  }

  /**
   * @param {string} language
   * @param {string} patternSlug
   * @param {boolean} isCorrect
   */
  static update(language, patternSlug, isCorrect) {
    if (!currentScore) {
      currentScore = {
        language,
        patternSlug,
        started: Date.now(),
        correctAnswers: 0,
        errors: 0
      };
      scores.push(currentScore);
    }

    currentScore.correctAnswers += isCorrect ? 1 : 0;
    currentScore.errors += isCorrect ? 0 : 1;

    if (currentScore.correctAnswers === config.maxExercises) {
      currentScore.finished = Date.now();
      currentScore = null;
      User.updateScore(scores);
    }

    this.subject.onNext(scores);
  }
}

Scores.subject = subject;

User.subject.subscribe(data => {
  if (data && data.scores) {
    Scores.setScores(data.scores);
  }
});
