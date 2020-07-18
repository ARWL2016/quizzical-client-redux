import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingComponent from "../../common/LoadingComponent";
import ErrorMessage from "../../common/ErrorMessage";
import './QuizList.scss'

import QuizTitle from "components/QuizTitle/QuizTitle";
import * as actionCreators from "../../store/actions";

class QuizList extends Component {
  componentDidMount() {
    this.props.setLoading(true);
    this.props.fetchQuizzes();
  }

  titleClickHandler = (e, quizId) => {
    this.props.history.push({ pathname: "/info/" + quizId });
  };

  renderQuizzes(quizzes) {
    return (
      <React.Fragment>
        {(quizzes || []).map((quiz) => (
          <QuizTitle
            key={quiz.quiz_id}
            click={() => this.titleClickHandler(null, quiz.quiz_id)}
            title={quiz.title}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    console.log(this.props)
    const { quizzes, error, loading } = this.props.quizList;

    return (
      <div className="quiz-list">
        {loading && <LoadingComponent />}
        {!loading && error && <ErrorMessage error={error} />}
        {!loading && !error && this.renderQuizzes(quizzes)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizList: state.quizList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizzes: () => dispatch(actionCreators.fetchQuizzes()),
    setLoading: (isLoading) => dispatch(actionCreators.setLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
