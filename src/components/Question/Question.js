import React from 'react';
import './Question.scss';

// renders into Quiz

const question = (props) => {

    const { options, text, question_number, question_id, optionIdSelected, sequence } = props;

    const renderAnswers = () => {
        return sequence.map(optionId => {
            return (
                <div key={optionId}>
                    <input type="radio" id={optionId} value={options[optionId]} onChange={() => props.clickHandler(question_id, optionId)} checked={optionId === optionIdSelected}></input>
                    <label htmlFor={optionId}>{options[optionId]}</label>
                </div>
            )
        })
    }

    return (
        <form className="question">
            <p>{question_number}. {text}</p>
            {renderAnswers()}
        </form>
    )
}

export default question;