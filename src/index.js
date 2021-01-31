import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app-component/App';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/routeComponent/Routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware()));

ReactDOM.render(
        <Provider store={store}>
        <Router> 
           <App />
        </Router>
        </Provider>,
    document.getElementById('root')
);

reportWebVitals();
