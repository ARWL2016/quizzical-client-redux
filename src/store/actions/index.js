export {
    fetchQuizzes,
    setLoading

} from './quizList';

export {
    fetchQuizHeader,
    fetchQuizHeaderError,
    setQuizHeader,
    setLoading as setQuizHeaderLoading
} from './quizHeader';

export {
    fetchQuizQuestions,
    // setQuizQuestions,
    nextQuestion,
    pickAnswer,
    submitAnswers,
    closeModal
    
} from './quiz';