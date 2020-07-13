import React from 'react';
import { Link } from 'react-router-dom';

import './TopNav.scss';

const topnav = () => {
    return (
        <nav className="top-nav">
            <Link to="/home">
                <span className="logo">quizzical?</span>
            </Link>

            <Link to="/add">
                <span className="menu-item">Add Quiz</span>

            </Link>
        </nav>
    )
}

export default topnav;