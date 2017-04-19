import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import App from './App';
import './index.css';
import rootReducer from './reducers'


//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
let initialState={
  account: {boards:[], username: '', email: '', id: ''},
  board: {boardElements: [], boardId: null, created_at: null, updated_at: null, title: ''},
  manageLogin: {token: window.localStorage.getItem("current user")}
}
let store = createStore(rootReducer, initialState, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
