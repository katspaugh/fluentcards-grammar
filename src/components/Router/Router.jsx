import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import patterns from '../../services/patterns';
import App from '../App/App.jsx';
import Home from '../Home/Home.jsx';
import Texts from '../Texts/Texts.jsx';
import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import styles from './Router.css';


const AppRoute = ({ match }) => {
  const pattern = patterns[match.params.language][match.params.pattern];

  return (
    <div>
      <Header title={ pattern.title }>
        <Link to={ `/quiz/${ match.params.language }` }>{ match.params.language }</Link>
        { ' › ' }
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

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />

      <Route exact path="/texts" component={ Texts } />

      <Route exact path="/quiz/:language" component={ Home } />

      <Route path="/quiz/:language/:pattern" component={ AppRoute } />

      <Footer />
    </div>
  </Router>
);

export default Routes;
