import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  quiz: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return Object.assign({}, state, { loading: true });

    case actionTypes.SET_QUIZ_HEADER:
      return updateObject(state, {
        quiz: action.payload,
        error: null,
        loading: false,
      });

    case actionTypes.FETCH_QUIZ_HEADER_ERROR:
      return Object.assign({}, state, {
        quiz: null,
        error: action.payload,
        loading: false,
      });

    default:
      return state;
  }
};

export default reducer;