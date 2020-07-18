import * as actionTypes from "./actionTypes";
import api from '../../axiosConfig';

export const fetchQuizzes = () => {
  return (dispatch) => {
    api.get('quiz')
      .then(data => {
        //  throw new Error();
        dispatch(setQuizzes(data.quizzes));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchQuizzesError('There was a problem fetching quizzes'));
      });
  };
};

export const setQuizzes = (quizzes) => {
  return {
    type: actionTypes.SET_QUIZZES,
    payload: quizzes,
  };
};

export const fetchQuizzesError = (message) => {
  return {
    type: actionTypes.FETCH_QUIZZES_ERROR,
    payload: message
  }
}

export const setLoading = (isLoading) => {
  return {
    type: actionTypes.SET_LOADING,
    payload: isLoading
  }
}
