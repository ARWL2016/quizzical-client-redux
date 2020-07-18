import * as actionTypes from "../actions/actionTypes";
import { shuffle } from "core/utils";

const initialState = {
  quiz_id: null,
  title: "",
  user_id: 0,
  questions: [],
  error: null,
  loading: false,
  selectedQuestion: null,
  answers: {},
  count: 0,
  invalidMessage: "Please complete all questions",
  showModal: false,
  result: null
};

const setQuizQuestions = (state, { quiz, questions }) => {
  const answers = {};

  // apply shuffle to get a new sequence for the answers on this render
  questions.forEach((q) => {
    const optionKeys = Object.keys(q.options);
    q.sequence = shuffle(optionKeys);
  });

  questions.forEach((q) => {
    answers[q.question_id] = null;
  });

  return Object.assign({}, state, {
    quiz_id: quiz.quiz_id,
    title: quiz.title,
    user_id: quiz.user_id,
    questions: questions,
    error: null,
    loading: false,
    answers: answers,
    selectedQuestion: questions[0],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return Object.assign({}, state, { loading: true });

    case actionTypes.SET_QUIZ_QUESTIONS:
      return setQuizQuestions(state, action.payload);

    case actionTypes.FETCH_QUIZ_HEADER_ERROR:
      return Object.assign({}, state, {
        quiz: null,
        error: action.payload,
        loading: false,
      });

    case actionTypes.NEXT_QUESTION:
      let newCount = state.count + action.payload;
      return Object.assign({}, state, {
        count: newCount,
        selectedQuestion: state.questions[newCount],
      });

    case actionTypes.PICK_ANSWER:
      const { questionId, optionId } = action.payload;
      return Object.assign({}, state, {
        answers: {
          ...state.answers,
          [questionId]: optionId,
        },
      });

    case actionTypes.MARK_INVALID:
      return Object.assign({}, state, {
        showModal: true,
      });

    case actionTypes.CLOSE_MODAL:
      return Object.assign({}, state, {
        showModal: false,
      });

    case actionTypes.SET_RESULT: 
    return Object.assign({}, state, {
      result: action.payload.result
    });

    default:
      return state;
  }
};

export default reducer;
