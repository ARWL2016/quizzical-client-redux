import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import LoadingComponent from "../../common/LoadingComponent";

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

  render() {
    const { quizzes, error, loading } = this.props.quizState;

    if (loading) {
      return <LoadingComponent />;
    }

    if (error) {
      return (
        <Message negative compact>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      );
    }

    return (
      <div className="QuizList">
        {(quizzes || []).map((quiz) => (
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
    quizState: state.quiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizzes: () => dispatch(actionCreators.fetchQuizzes()),
    setLoading: (isLoading) => dispatch(actionCreators.setLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
