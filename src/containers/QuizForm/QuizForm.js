import React, { Component } from 'react';
import './QuizForm.scss';
import { postQuiz } from 'data/quiz-data';

class QuizForm extends Component {

    state = {
        quizTitle: '',
        questions: []
    }

    componentDidMount() {
        this.addQuestion();
    }

    addQuestion = () => {
        const next = this.state.questions.length + 1;

        this.setState(state => {
            return {
                questions: [
                    ...state.questions,
                    {
                        number: next,
                        text: '',
                        correctAnswer: '',
                        options: ['', '', '']
                    }
                ]
            }
        })
    }

    handleTitleChange = (event) => {
        this.setState({ quizTitle: event.target.value });
    }

    handleQuestionChange = (event, questionNumber, fieldName) => {
        const { value } = event.target;

        this.setState(state => {
            return {
                questions: state.questions.map(question => {
                    if (question.number === questionNumber) {
                        return {
                            ...question,
                            [fieldName]: value,
                        }
                    } else {
                        return question;
                    }
                })
            }
        });

    }

    handleOptionChange = (event, questionNumber, optionIndex) => {
        const { value } = event.target;

        this.setState(state => {
            return {
                questions: state.questions.map(question => {
                    if (question.number === questionNumber) {
                        return {
                            ...question,
                            options: question.options.map((option, idx) => {
                                return (idx === optionIndex) ? value : option;
                            })
                        }
                    } else {
                        return question;
                    }
                })
            }
        });
    }

    handleAddQuestion = (e) => {
        e.preventDefault();
        this.addQuestion();
    }

    handleRemoveQuestion = (event, questionNumber) => {
        event.preventDefault();

        this.setState(state => {
            const newQuestions = state.questions.filter(q => q.number !== questionNumber).map((q, idx) => {
                return {
                    ...q,
                    number: idx + 1
                }
            })

            return {
                questions: newQuestions
            }
        });


    }

    handleFormSubmit = async (e) => {
        e.preventDefault();

        const quiz = await postQuiz(this.state);

        if (quiz) {
            this.props.history.push(`/home`);
        }
    }

    render() {
        const { quizTitle, questions } = this.state;

        if (!questions) { return null }

        return (

            <form className="quiz-form-container" onSubmit={this.handleFormSubmit}>
                <div className="form-field-container">
                    <div className="form-field title-field">
                        <label htmlFor="quizTitle">Quiz Title</label>
                        <input
                            type="text"
                            name="quizTitle"
                            placeholder="add a snappy title"
                            value={quizTitle}
                            onChange={this.handleTitleChange}
                            required="required"></input>
                    </div>
                    {questions.map((q, idx) => {
                        return (
                            <div key={idx} className="question-container">
                                <div className="form-field" >
                                    <label htmlFor={q.number}>Q{q.number}.</label>
                                    <input
                                        placeholder="add question text"
                                        type="text"
                                        name={q.number}
                                        value={q.text}
                                        onChange={(ev) => this.handleQuestionChange(ev, q.number, 'text')}
                                        required="required"
                                    ></input>
                                </div>

                                <div className="answers-container">
                                    <div className="form-field">
                                        <label htmlFor="correctAnswer">Answer</label>
                                        <input
                                            type="text"
                                            placeholder="correct answer text"
                                            name="correctAnswer"
                                            value={q.correctAnswer}
                                            onChange={(ev) => this.handleQuestionChange(ev, q.number, 'correctAnswer')}
                                            required="required"
                                        ></input>


                                    </div>

                                    {q.options.map((option, idx) => {
                                        return (
                                            <div key={idx}>
                                                <div className="form-field">
                                                    <label htmlFor={option}>Option</label>
                                                    <input
                                                        type="text"
                                                        placeholder={'alternative answer ' + (idx + 1)}
                                                        name={option}
                                                        value={option}
                                                        onChange={(ev) => this.handleOptionChange(ev, q.number, idx)}
                                                        required="required"
                                                    ></input>


                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                {(questions.length < 2) ? null : (
                                    <div className="question-button-container">
                                        <button className="remove-question-button" onClick={(ev) => this.handleRemoveQuestion(ev, q.number)}>Remove Question</button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    <div className="form-button-container">
                        <button className="add-question-button" onClick={this.handleAddQuestion}>Add Question</button>
                        <input type="submit" value="Save Quiz" />
                    </div>

                </div>


            </form>





        )
    }
}

export default QuizForm;