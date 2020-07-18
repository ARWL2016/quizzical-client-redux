import * as actionTypes from "./actionTypes";
import api from "../../axiosConfig";

export const fetchQuizQuestions = (id) => {
  return (dispatch) => {
    api
      .get(`quiz/${id}/questions`)
      .then((data) => {
        //  throw new Error();
        dispatch(setQuizQuestions(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          fetchQuizQuestionsError(
            "There was a problem fetching the quiz questions"
          )
        );
      });
  };
};

const setQuizQuestions = (data) => {
  return {
    type: actionTypes.SET_QUIZ_QUESTIONS,
    payload: data,
  };
};

const fetchQuizQuestionsError = (message) => {
  return {
    type: actionTypes.FETCH_QUIZ_QUESTIONS_ERROR,
    payload: message,
  };
};

export const nextQuestion = (iteration) => {
  return {
    type: actionTypes.NEXT_QUESTION,
    payload: iteration
  };
};

export const pickAnswer = (questionId, optionId) => {
  return {
    type: actionTypes.PICK_ANSWER,
    payload: { questionId, optionId }
  };
};



const checkValidity = (answers) => {
  let isValid = true;

  Object.keys(answers).forEach((key) => {
    if (answers[key] === null) {
      isValid = false;
    }
  });

  return isValid;
};

export const submitAnswers = ({quiz_id, user_id, answers}) => {
  return (dispatch) => {
    if (checkValidity(answers)) {
      const payload = {
        answers: answers,
        quiz_id: quiz_id,
        user_id: user_id,
      };
  
      api.post('attempt', payload).then(data => {
        dispatch(setResult(data))
      })
  
    } else {
      dispatch(markInvalid())
    }
  }
  
};

const markInvalid = () => {
  return {
    type: actionTypes.MARK_INVALID
  }
}

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}

export const setResult = (result) => {
  return {
    type: actionTypes.SET_RESULT,
    payload: result
  }
}



