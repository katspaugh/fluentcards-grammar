import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import styles from './Router.css';

// Front
import FrontRoute from '../../../shared/components/FrontRoute/FrontRoute.jsx';

// Grammar
import HomeRoute from '../../../grammar/components/HomeRoute/HomeRoute.jsx';
import QuizRoute from '../../../grammar/components/QuizRoute/QuizRoute.jsx';
import TextsRoute from '../../../grammar/components/TextsRoute/TextsRoute.jsx';
//import EditorRoute from '../../../grammar/components/EditorRoute/EditorRoute.jsx';
//<Route exact path="/editor" component={ EditorRoute } />

// Vocab
import DecksRoute from '../../../vocab/components/DecksRoute/DecksRoute.jsx';
import WordsRoute from '../../../vocab/components/WordsRoute/WordsRoute.jsx';
import KindleUpload from '../../../vocab/components/KindleUpload/KindleUpload.jsx';

const Routes = () => (
  <Router>
    <div>
      <Nav />

      <Route exact path="/" component={ FrontRoute } />

      <Route exact path="/grammar" component={ HomeRoute } />
      <Route exact path="/grammar/texts" component={ TextsRoute } />
      <Route exact path="/grammar/quiz/:language" component={ HomeRoute } />
      <Route path="/grammar/quiz/:language/:pattern" component={ QuizRoute } />

      <Route exact path="/vocab" component={ DecksRoute } />
      <Route path="/vocab/:id" component={ WordsRoute } />
      <Route path="/kindle" component={ KindleUpload } />

      <Footer />
    </div>
  </Router>
);

export default Routes;
