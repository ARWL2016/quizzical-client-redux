import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  quizzes: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return Object.assign({}, state, { loading: true });

    case actionTypes.SET_QUIZZES:
      return updateObject(state, {
        quizzes: action.payload,
        error: null,
        loading: false,
      });

    case actionTypes.FETCH_QUIZZES_ERROR:
      return Object.assign({}, state, {
        quizzes: [],
        error: action.payload,
        loading: false,
      });

    default:
      return state;
  }
};

export default reducer;
