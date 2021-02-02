import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app-component/App';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
        <Provider store={store}>
        <Router> 
           <App />
        </Router>
        </Provider>,
    document.getElementById('root')
);

reportWebVitals();
