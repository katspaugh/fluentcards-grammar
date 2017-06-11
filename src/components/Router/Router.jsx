import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import patterns from '../../services/patterns';
import Login from '../Login/Login.jsx';
import App from '../App/App.jsx';
import Home from '../Home/Home.jsx';
import Texts from '../Texts/Texts.jsx';
import Editor from '../Editor/Editor.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from './Router.css';


const AppRoute = ({ match }) => {
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
      <Login />

      <Route exact path="/" component={ Home } />

      <Route exact path="/texts" component={ Texts } />

      <Route exact path="/editor" component={ Editor } />

      <Route exact path="/quiz/:language" component={ Home } />

      <Route path="/quiz/:language/:pattern" component={ AppRoute } />

      <Footer />
    </div>
  </Router>
);

export default Routes;
