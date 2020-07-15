import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { server } from './environment';

import counterReducer from './store/reducers/counter';
import quizReducer from './store/reducers/quiz'

const rootReducer = combineReducers({
   quiz: quizReducer,
   counter: counterReducer
})



console.log(`[quizzical-client] running in ${process.env.NODE_ENV} mode` );
console.log(`[quizzical-client] connecting to API on ${server}` );


const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
   <Provider store={store}>
      <App />
   </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
