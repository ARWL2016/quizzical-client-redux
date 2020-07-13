import React from 'react';
import './Card.scss';

const card = (props) => {
    return (
        <div className="card">
            <header className="card-header">
                <h2>{props.header}</h2>


            </header>
            <section className="card-section">
                {props.body}
                {props.children}
            </section>
        </div>
    )
}

export default card;