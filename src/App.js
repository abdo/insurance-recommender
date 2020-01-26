import { Route, Switch } from 'react-router-dom';
import React from 'react';

import Header from './components/header';
import Questionnaire from './pages/questionnaire';
import Result from './pages/result';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' component={Questionnaire} exact />
        <Route path='/result' component={Result} />
      </Switch>
    </>
  );
}

export default App;
