import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import patterns from '../../services/patterns';
import App from '../App/App.jsx';

const Home = () => (
  <div>
    { Object.keys(patterns).map(language => (
      <ul key={ language }>
        <h2>{ language }</h2>

        { Object.keys(patterns[language]).map((key, i) => (
          <li key={ i }>
            <Link to={ `/${ language }/${ key }` }>{ patterns[language][key].title }</Link>
          </li>
        )) }
      </ul>
    )) }
  </div>
);


const AppRoute = ({ match }) => {
  const pattern = patterns[match.params.language][match.params.pattern];

  return (
    <App
      language={ match.params.language }
      title={ pattern.title }
      pattern={ pattern.pattern }
      />
  );
};

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />

      <Route path="/:language/:pattern" component={ AppRoute } />
    </div>
  </Router>
);

export default Routes;
