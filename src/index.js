import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { server } from './environment';



console.log(`[quizzical-client] running in ${process.env.NODE_ENV} mode` );
console.log(`[quizzical-client] connecting to API on ${server}` );




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
