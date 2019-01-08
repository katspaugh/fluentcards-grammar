import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../shared/components/Header/Header.jsx';
import patterns from '../../patterns';
import Quiz from '../Quiz/Quiz.jsx';
import styles from './QuizRoute.module.css';

export default ({ match }) => {
  let pattern = patterns[match.params.language][match.params.pattern];

  if (!pattern) {
    try {
      pattern = JSON.parse(atob(match.params.pattern));
    } catch (e) {
      return null;
    }
    pattern.pattern.forEach(patternPart => {
      Object.keys(patternPart).forEach(key => {
        if ('choices' !== key) {
          patternPart[key] = new RegExp(patternPart[key]);
        }
      });
    });
    if (!pattern.pattern.some(patternPart => patternPart.occlusion)) {
      pattern.pattern[0].occlusion = /.+/;
    }
  }

  return (
    <div>
      <Header title={ pattern.title }>
        <Link to={ `/grammar/quiz/${ match.params.language }` }>{ match.params.language }</Link>
        { ' › ' }
      </Header>

      <div className={ styles.container }>
        <Quiz
          language={ match.params.language }
          description={ pattern.description }
          pattern={ pattern.pattern }
          patternSlug={ match.params.pattern }
          />
      </div>
    </div>
  );
};
