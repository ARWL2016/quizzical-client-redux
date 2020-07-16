import React, { Component } from "react";
import { connect } from "react-redux";
import "./QuizHeader.scss";
import * as actionCreators from "../../store/actions";
import ErrorMessage from "../../common/ErrorMessage";

import LoadingComponent from "../../common/LoadingComponent";

class QuizHeader extends Component {
  async componentDidMount() {
    const id = +this.props.match.params.id;

    this.props.setLoading(true);
    this.props.fetchQuizHeader(id);
  }

  backHandler = () => {
    this.props.history.push("/home");
  };

  startQuizHandler = (quiz) => {
    console.log(quiz);
    this.props.history.push("/quiz/" + quiz.quiz_id);
  };

  renderQuiz(quiz) {
    return (
      <React.Fragment>
        <h1>{quiz && quiz.title}</h1>
        <button onClick={this.backHandler}>Back to Quiz List</button>
        <button onClick={() => this.startQuizHandler(quiz)}>Start Quiz</button>
      </React.Fragment>
    );
  }

  render() {
    const { quiz, error, loading } = this.props.quizHeader;

    return (
      <div className="quiz-header">
          { loading && <LoadingComponent />}
          { !loading && error && <ErrorMessage error={error} />}
          { !loading && !error && this.renderQuiz(quiz)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizHeader: state.quizHeader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizHeader: (id) => dispatch(actionCreators.fetchQuizHeader(id)),
    setLoading: (isLoading) =>
      dispatch(actionCreators.setQuizHeaderLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizHeader);
