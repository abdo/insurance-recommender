import * as actionTypes from './actionTypes';

import http, {
  userAPI,
  recommendationAPI,
  setAuthToken,
} from '../../utils/httpService';

export const sendData = (userData, callback) => (dispatch) => {
  dispatch({
    type: actionTypes.SEND_DATA_START,
  });
  http
    .post(userAPI, userData)
    .then(({ data: { jwt } }) => {
      setAuthToken(jwt);
      if (callback) callback();
      dispatch({
        type: actionTypes.SEND_DATA_END,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.REQUEST_ERROR,
      });
    });
};

export const fetchRecommendations = (callback) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_RECOMMENDATIONS_START,
  });
  http
    .get(recommendationAPI)
    .then((res) => {
      if (callback) callback();
      dispatch({
        type: actionTypes.FETCH_RECOMMENDATIONS_END,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.REQUEST_ERROR,
      });
    });
};
