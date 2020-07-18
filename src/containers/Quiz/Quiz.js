import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

import Question from "components/Question/Question";
import Modal from "components/Modal/Modal";
import "./Quiz.scss";

import LoadingComponent from "../../common/LoadingComponent";

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizQuestions(this.props.match.params.id);
  }

  componentDidUpdate() {
    const { result } = this.props.quiz;
    if (result && result.attempt_id) {
      this.props.history.push(`/result/${result.attempt_id}`);
    }
  }

  renderSaveButton(isLast) {
    return isLast ? (
      <button className="next" onClick={() => this.props.submitAnswers(this.props.quiz)}>
        Check Answers
      </button>
    ) : null
  }

  render() {
    console.log(this.props);
    
    const { title, questions, count, selectedQuestion, answers, showModal, invalidMessage } = this.props.quiz;
    if (!selectedQuestion) {
      return <div />;
    }

    const isLast = count === questions.length - 1;
    const optionIdSelected = answers
      ? answers[selectedQuestion.question_id]
      : null;

    return (
      <div className="quiz-container">
        <header>
          <h2>{title}</h2>
          <span>
            {count + 1} / {questions.length}
          </span>
        </header>
        <section>
            <Question
              key={selectedQuestion.question_id}
              {...selectedQuestion}
              optionIdSelected={optionIdSelected}
              clickHandler={(questionId, optionId) => this.props.pickAnswer(questionId, optionId)}
            ></Question>
          <div>
            <button
              className="previous"
              disabled={count === 0}
              onClick={() => this.props.nextQuestion(-1)}>Previous</button>
            <button
              className="next"
              disabled={isLast}
              onClick={() => this.props.nextQuestion(1)}>Next</button>

            {this.renderSaveButton(isLast)}
          </div>
        </section>

        <Modal show={showModal} clicked={this.props.closeModal}>
          {invalidMessage}
        </Modal>
      </div>
    );
  }

  
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizQuestions: (id) => dispatch(actionCreators.fetchQuizQuestions(id)),
    nextQuestion: (iteration) => dispatch(actionCreators.nextQuestion(iteration)),
    pickAnswer: (questionId, optionId) => dispatch(actionCreators.pickAnswer(questionId, optionId)),
    submitAnswers: (state) => dispatch(actionCreators.submitAnswers(state)), 
    closeModal: () => dispatch(actionCreators.closeModal())
    //   setLoading: (isLoading) =>
    //     dispatch(actionCreators.setQuizHeaderLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
