import { combineReducers } from 'redux';

import recommendationsReducer from './recommendationsReducer';

export default combineReducers({
  recommendations: recommendationsReducer,
});
