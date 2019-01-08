import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import styles from './FrontRoute.module.css';


/**
 * FrontRoute component
 */
export default () => {
  return (
    <div className={ styles.front }>
      <section className={ styles.hero }>
        <Header title="Fluentcards Grammar" />

        <div className={ styles.container }>
          <p>
            Grammar drills from books and movies
          </p>


          <Link to="/grammar" className={ styles.cta }>
            Get started
          </Link>
        </div>
      </section>

      <section>
        <div className={ styles.container }>
          <p>
            <Link to="/grammar">
              <img alt="" src="/images/grammar.png" className={ styles.imageRight } />
            </Link>

            To become fluent in a foreign language, one must deeply internalize its grammatical patterns.

            <br />
            <br />

            We dynamically generate grammar exercises from classical, sci-fi and fantasy books and movie subtitles.

            <br />
            <br />

            Cement your grammar knowledge with infinite grammar drills.
          </p>

          <Link to="/grammar" className={ styles.cta }>
            Start doing exercises
          </Link>
        </div>
      </section>
    </div>
  );
}
