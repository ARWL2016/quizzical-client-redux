import React from 'react';
import './QuizTitle.scss';

/**
 *  used by: QuizList
 */

const quiztitle = (props) => {
    return <div className="quiz-title" onClick={props.click}>{props.title}</div>
}

export default quiztitle;