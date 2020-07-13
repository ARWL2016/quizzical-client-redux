import axios from 'axios';
import { shuffle } from 'core/utils';
import { server } from '../environment';

async function getAll() {
    try {
      console.log(process.env)  
      const response = await axios.get(`${server}/quiz`);
        
        return response.data.data.quizzes;

      } catch (error) {
        console.error(error);
      }
}

async function getQuizById(id) {
    try {
        const response = await axios.get(`${server}/quiz/${id}`);
        return response.data.data.quiz;

      } catch (error) {
        console.error(error);
      }
}

async function getQuizQuestions(id) {
  try {
      const response = await axios.get(`${server}/quiz/${id}/questions`);


      const {quiz, questions } = response.data.data;

      questions.forEach(q => {
        const optionKeys = Object.keys(q.options);
        q.sequence = shuffle(optionKeys);
      })

      return {quiz, questions};



      // return response.data.data;

    } catch (error) {
      console.error(error);
    }
}

async function postQuiz(quiz) {
  try {
    const response = await axios.post(`${server}/quiz`, quiz);
    return response.data.data;

  } catch (error) {
    console.error(error);
  }
}



export {
    getAll, getQuizById, getQuizQuestions, postQuiz
}