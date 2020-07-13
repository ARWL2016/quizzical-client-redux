// This container component will hold any top level state

import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import QuizList from 'containers/QuizList/QuizList';
import Quiz from 'containers/Quiz/Quiz';
import './Layout.scss';
import QuizHeader from 'containers/QuizHeader/QuizHeader';
import QuizForm from 'containers/QuizForm/QuizForm';
import TopNav from '../TopNav/TopNav';
import Result from 'containers/Result/Result';

class LayoutContainer extends Component {


    render() {
        return (
            <div className="LayoutContainer">
                <TopNav></TopNav>


                <Switch>
                    <Route path="/home" component={QuizList} />
                    <Route path="/info/:id" component={QuizHeader} />
                    <Route path="/quiz/:id" component={Quiz} />
                    <Route path="/result/:id" component={Result} />
                    <Route path="/add" component={QuizForm} />

                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}

export default LayoutContainer;
