import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import React from 'react';

import Header from './components/header';
import Questionnaire from './pages/questionnaire';
import Result from './pages/result';

import './styles/_global.scss';

function App({ isFetchingRecommendations, isSendingData }) {
  const isLoading = isFetchingRecommendations || isSendingData;
  return (
    <>
      <Header />
      {isLoading ? (
        <div className='spinner'>
          <div></div>
        </div>
      ) : (
        <Switch>
          <Route path='/' component={Questionnaire} exact />
          <Route path='/result' component={Result} />
        </Switch>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isFetchingRecommendations: state.recommendations.isFetchingRecommendations,
  isSendingData: state.recommendations.isSendingData,
});

export default connect(mapStateToProps)(App);
