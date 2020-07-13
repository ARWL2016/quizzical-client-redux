import React, { Component } from 'react';
import { getAttemptReport } from 'data/attempt-data';
import Card from 'components/Card/Card';
import './Result.scss';

// const temp = { "attempt_id": 29, "quiz_id": 4, "user_id": 1, "datetime": "2020-04-27T09:33:37.926Z", "quiz_title": "Cities and Capitals", "results": [{ "question_id": 1, "text": "What is the capital of France?", "answer": "Lyon", "correct_answer": "Paris", "result": false }, { "question_id": 2, "text": "What is the capital of Germany?", "answer": "Berlin", "correct_answer": "Berlin", "result": true }], "num_questions": "2", "score": "1" };

export default class Result extends Component {

    state = {};

    async componentDidMount() {
        const id = +this.props.match.params.id;

        const attempt = await getAttemptReport(id);
        if (attempt) {
            this.setState({ ...attempt });
        }

    }

    renderErrors() {
        const errors = this.state.results.filter(r => r.result === false);

        if (errors.length) {
            return (
                <>
                    <p>Here's what you got wrong...</p>

                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Your answer</th>
                                <th>Correct answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errors.map(e => {
                                return (
                                    <tr key={e.question_id}>
                                        <td>{e.question_id}) {e.text}</td>
                                        <td style={{ 'textAlign': 'center' }}>{e.option_selected}</td>
                                        <td style={{ 'textAlign': 'center' }}>{e.correct_option}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </>
            )
        }
    }

    renderBody() {

        return (
            <>
                <div className="score">You scored {this.state.score} out of {this.state.num_questions}</div>
                {this.renderErrors()}
            </>
        )
    }

    render() {
        if (this.state && this.state.results) {
            return (
                <div className="result-container">

                    <Card className="result-container"
                        header={this.state.quiz_title}
                        body={
                            <>
                                <div className="score">You scored {this.state.score} out of {this.state.num_questions}</div>
                                {this.renderErrors()}
                            </>
                        }></Card>
                </div>
            )
        } else {
            return null;
        }
    }
}