import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import {
ConnectedRouter as Router,
routerMiddleware
} from 'react-router-redux'
import thunk from 'redux-thunk'
import { Route, Link} from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';
import rootReducer from './reducers'

const history = createHistory()
const rMiddleware = routerMiddleware(history)
let loggedin=window.localStorage.getItem("current user")
let initialState={
  boardAttributes: {sidebarActive: (!!loggedin ? false : true), showCollabForm: false},
  account: {boards:[], username: '', email: '', id: ''},
  board: {boardElements: [], accounts: [], public: false, slug: '', boardId: null, created_at: null, updated_at: null, title: '',  currentColor: "#ffeb3b"},
  manageLogin: {token: window.localStorage.getItem("current user")}
}
let store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, rMiddleware)))


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/about" component={App}/>
        <Route exact path="/:username" component={App}/>
        <Route exact path="/:username/b/:boardId" component={App}/>
        <Route exact path="/:username/:slug" component={App}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
