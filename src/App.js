import React, { Component } from 'react';
import LayoutContainer from './core/Layout/Layout';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {



    render() {

        return (
            <BrowserRouter>
                <div className="App">
                    <LayoutContainer />

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
