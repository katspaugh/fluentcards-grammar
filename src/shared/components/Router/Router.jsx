import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';

// Front
import FrontRoute from '../../../shared/components/FrontRoute/FrontRoute.jsx';

// Grammar
import HomeRoute from '../../../grammar/components/HomeRoute/HomeRoute.jsx';
import QuizRoute from '../../../grammar/components/QuizRoute/QuizRoute.jsx';
import TextsRoute from '../../../grammar/components/TextsRoute/TextsRoute.jsx';
//import EditorRoute from '../../../grammar/components/EditorRoute/EditorRoute.jsx';
//<Route exact path="/editor" component={ EditorRoute } />

import './Router.module.css';

const Routes = () => (
  <Router>
    <div>
      <Nav />

      <Route exact path="/" component={ FrontRoute } />

      <Route exact path="/grammar" component={ HomeRoute } />
      <Route exact path="/grammar/texts" component={ TextsRoute } />
      <Route exact path="/grammar/quiz/:language" component={ HomeRoute } />
      <Route path="/grammar/quiz/:language/:pattern" component={ QuizRoute } />

      <Footer />
    </div>
  </Router>
);

export default Routes;
