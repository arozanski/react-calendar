import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, compose, combineReducers } from 'redux';
import colorsReducer from './store/reducers/colors';
import eventsReducer from './store/reducers/events';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    color: colorsReducer,
    event: eventsReducer
});

const store = createStore(rootReducer, composeEnhancers());

const app = (<Provider store={store}><App /></Provider>);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
