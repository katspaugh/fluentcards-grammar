import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from './Router.css';

// Grammar
import HomeRoute from '../../../grammar/components/HomeRoute/HomeRoute.jsx';
import QuizRoute from '../../../grammar/components/QuizRoute/QuizRoute.jsx';
import TextsRoute from '../../../grammar/components/TextsRoute/TextsRoute.jsx';
//import EditorRoute from '../../../grammar/components/EditorRoute/EditorRoute.jsx';
//<Route exact path="/editor" component={ EditorRoute } />

// Vocab
import DecksRoute from '../../../vocab/components/DecksRoute/DecksRoute.jsx';
import WordsRoute from '../../../vocab/components/WordsRoute/WordsRoute.jsx';

const Routes = () => (
  <Router>
    <div>
      <Nav />

      <Route exact path="/" component={ HomeRoute } />

      <Route exact path="/texts" component={ TextsRoute } />

      <Route exact path="/quiz/:language" component={ HomeRoute } />

      <Route path="/quiz/:language/:pattern" component={ QuizRoute } />

      <Route exact path="/vocab" component={ DecksRoute } />
      <Route path="/vocab/:lang" component={ WordsRoute } />

      <Footer />
    </div>
  </Router>
);

export default Routes;
