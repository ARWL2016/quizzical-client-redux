import React, { Component } from "react";
import QuizTitle from "components/QuizTitle/QuizTitle";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class QuizList extends Component {
  componentDidMount() {
    this.props.fetchQuizzes();
  }

  titleClickHandler = (e, quizId) => {
    this.props.history.push({ pathname: "/info/" + quizId });
  };

  render() {
    console.log(this.props);

    return (
      <div className="QuizList">
        {(this.props.quiz.quizzes || []).map((quiz) => (
          <QuizTitle
            key={quiz.quiz_id}
            click={() => this.titleClickHandler(null, quiz.quiz_id)}
            title={quiz.title}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizzes: () => dispatch(actionCreators.fetchQuizzes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
