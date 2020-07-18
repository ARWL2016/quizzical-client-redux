import * as actionTypes from "./actionTypes";
import api from '../../axiosConfig';

export const fetchQuizHeader = (id) => {
  return (dispatch) => {
    api.get(`quiz/${id}`)
      .then((data) => {
        // throw new Error();
        dispatch(setQuizHeader(data.quiz));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchQuizHeaderError('There was a problem fetching quiz details'));
      });
  };
};

export const setQuizHeader = (quiz) => {
  return {
    type: actionTypes.SET_QUIZ_HEADER,
    payload: quiz,
  };
};

export const fetchQuizHeaderError = (message) => {
  return {
    type: actionTypes.FETCH_QUIZ_HEADER_ERROR,
    payload: message
  }
}

export const setLoading = (isLoading) => {
  return {
    type: actionTypes.SET_LOADING,
    payload: isLoading
  }
}