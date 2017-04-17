import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'thunk'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'

import App from './App';
import './index.css';
import { manageElements } from './reducers/manageElements'

let store = createStore(manageElements, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
