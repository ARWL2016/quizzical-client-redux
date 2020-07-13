import React, { Component } from 'react';
import QuizTitle from 'components/QuizTitle/QuizTitle';
import { getAll } from 'data/quiz-data';


class QuizList extends Component {
    state = {
        quizTitles: []
    }

    async componentDidMount() {

        const quizList = await getAll();

        if (quizList) {
            const quizTitles = quizList.map(quiz => ({ id: quiz.quiz_id, title: quiz.title }));
            this.setState({ quizTitles });
        }

    }

    titleClickHandler = (e, title) => {
        this.props.history.push({ pathname: "/info/" + title.id });
    }

    render() {
        const { quizTitles } = this.state;

        return (
            <div className="QuizList">
                {quizTitles.map(title => {
                    return <QuizTitle key={title.id} click={() => this.titleClickHandler(null, title)} title={title.title} />
                })}

            </div>
        );

    }
}

export default QuizList;



