import * as actionTypes from "./actionTypes";
import axios from 'axios';
import { server } from  '../../environment';

export const fetchQuizzes = () => {
  return (dispatch) => {
    axios
      .get(`${server}/quiz`)
      .then((response) => {
        dispatch(setQuizzes(response.data.data.quizzes));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setQuizzes = (quizzes) => {
  return {
    type: actionTypes.SET_QUIZZES,
    payload: quizzes,
  };
};
