import React, { Component } from 'react';

import { getQuizQuestions } from 'data/quiz-data';
import { postAttempt } from 'data/attempt-data';
import Question from 'components/Question/Question';
import Modal from 'components/Modal/Modal';
import './Quiz.scss';

class Quiz extends Component {

    quiz = {};
    questions = [];

    state = {
        selectedQuestion: null,
        answers: {},
        count: 0,
        showModal: false,
        invalidMessage: 'Please complete all questions'
    }

    async componentDidMount() {
        const quizQuestions = await getQuizQuestions(this.props.match.params.id);

        if (quizQuestions) {
            this.quiz = quizQuestions.quiz;
            this.questions = quizQuestions.questions;

            const answers = {};

            this.questions.forEach(q => {
                answers[q.question_id] = null
            });

            this.setState({
                selectedQuestion: this.questions[0],
                answers: answers,
                count: 0
            });
        }
    }

    clickHandler = (questionId, optionId) => {
        this.setState((state) => {
            return {
                answers: {
                    ...state.answers,
                    [questionId]: optionId
                }
            }
        })
    }

    nextHandler = (iteration) => {
        this.setState((state) => {
            let newCount = state.count + iteration;

            return {
                selectedQuestion: this.questions[newCount],
                answers: { ...state.answers },
                count: newCount
            }

        });
    }

    checkHandler = async () => {
        if (this.checkValidity()) {
            const payload = {
                answers: this.state.answers,
                quiz_id: this.quiz.quiz_id,
                user_id: this.quiz.user_id
            }

            const result = await postAttempt(payload);

            if (result) {
                this.props.history.push(`/result/${result.attempt_id}`);
            }

        } else {
            this.setState({ showModal: true });
        }
    }

    handleModalClick = () => {
        this.setState({ showModal: false })
    }

    checkValidity = () => {
        let isValid = true;
        const { answers } = this.state;

        Object.keys(answers).forEach(key => {
            if (answers[key] === null) {
                isValid = false;
            }
        });

        return isValid;
    }

    renderSaveButton(isLast) {
        if (!isLast) { return }
        return (
            <button className="next" onClick={() => this.checkHandler()}>Check Answers</button>
        )
    }

    render() {
        if (!this.state.selectedQuestion) { return <div /> }

        const { selectedQuestion, count, answers } = this.state;
        const isLast = count === this.questions.length - 1;
        const optionIdSelected = answers ? answers[selectedQuestion.question_id] : null;

        return (
            <div className="quiz-container">
                <header>
                    <h2>{this.quiz.title}</h2>
                    <span>{count + 1} / {this.questions.length}</span>
                </header>

                <section>
                    <div>
                        <Question key={selectedQuestion.question_id} {...selectedQuestion} optionIdSelected={optionIdSelected} clickHandler={this.clickHandler}></Question>

                    </div>
                    <div>
                        <button className="previous" disabled={count === 0} onClick={() => this.nextHandler(-1)}>Previous</button>
                        <button className="next" disabled={isLast} onClick={() => this.nextHandler(1)}>Next</button>

                        {this.renderSaveButton(isLast)}

                    </div>

                </section>
                {/* {JSON.stringify(this.state)} */}

                <Modal show={this.state.showModal} clicked={this.handleModalClick}>
                    {this.state.invalidMessage}
                </Modal>


            </div>


        )
    }
}

export default Quiz;




