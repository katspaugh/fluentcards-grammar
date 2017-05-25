import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import patterns from '../../services/patterns';
import App from '../App/App.jsx';
import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import styles from './Router.css';

const Home = ({ match }) => {
  const languages = match.params.language ?
        [ match.params.language ] :
        Object.keys(patterns);

  return (
    <div className={ styles.home }>
      <Header title={ match.params.language ? '' : 'Grammar exercises' }>
        { match.params.language ? (<Link to="/">All languages</Link>) : '' }
      </Header>

      <div className={ styles.routeContainer }>
        { languages.map(language => (
          <ul key={ language }>
            <h2>{ language }</h2>

            { Object.keys(patterns[language]).map((key, i) => (
              <li key={ i }>
                <Link to={ `/exercises/${ language }/${ key }` }>{ patterns[language][key].title }</Link>
              </li>
            )) }
          </ul>
        )) }
      </div>
    </div>
  );
};

const AppRoute = ({ match }) => {
  const pattern = patterns[match.params.language][match.params.pattern];

  return (
    <div>
      <Header title={ pattern.title }>
        <Link to={ `/exercises/${ match.params.language }` }>{ match.params.language }</Link>:
      </Header>

      <div className={ styles.routeContainer }>
        <App
          language={ match.params.language }
          description={ pattern.description }
          pattern={ pattern.pattern }
          />
      </div>
    </div>
  );
};

const Texts = () => (
  <div>
    <Header title="">
      <Link to="/">Grammar exercises</Link>
    </Header>

    <div className={ styles.routeContainer }>
      <p>The following texts have been used to create the grammar exercises:</p>

      <ul>
        <li>
          Brüder Grimm, <a href="http://gutenberg.spiegel.de/buch/die-schonsten-kinder-und-hausmarchen-6248/1">
            Die schönsten Kinder- und Hausmärchen
          </a>
        </li>

        <li>
          Franz Kafka, <a href="http://gutenberg.spiegel.de/buch/franz-kafka-erz-161/1">
            26 Erzählungen
          </a>
        </li>

        <li>
          Stefan Zweig, <a href="http://gutenberg.spiegel.de/buch/schachnovelle-7318/1">
            Schachnovelle
          </a>
        </li>

        <li>
          H. G. Wells, <a href="https://www.gutenberg.org/ebooks/35">
            The Time Machine
          </a>
        </li>

        <li>
          The subtitles for “The Avengers” (2003) from Opensubtitles.org
        </li>
      </ul>
    </div>
  </div>
);

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />

      <Route exact path="/texts" component={ Texts } />

      <Route exact path="/exercises/:language" component={ Home } />

      <Route path="/exercises/:language/:pattern" component={ AppRoute } />

      <Footer />
    </div>
  </Router>
);

export default Routes;
