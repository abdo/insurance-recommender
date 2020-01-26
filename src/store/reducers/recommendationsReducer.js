import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  recommendations: [],
  isFetchingRecommendations: false,
  isSendingData: false,
  hasRequestError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RECOMMENDATIONS_START:
      return {
        ...state,
        isFetchingRecommendations: true,
        hasRequestError: false,
      };

    case actionTypes.FETCH_RECOMMENDATIONS_END:
      return {
        ...state,
        recommendations: action.payload || [],
        isFetchingRecommendations: false,
        hasRequestError: false,
      };

    case actionTypes.SEND_DATA_START:
      return {
        ...state,
        isSendingData: true,
        hasRequestError: false,
      };

    case actionTypes.SEND_DATA_END:
      return {
        ...state,
        isSendingData: false,
        hasRequestError: false,
      };

    case actionTypes.REQUEST_ERROR:
      return {
        ...state,
        hasRequestError: true,
        isFetchingRecommendations: false,
        isSendingData: false,
      };

    default:
      return state;
  }
};
