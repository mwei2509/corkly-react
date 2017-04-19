import {manageElements} from './manageElements'
import {manageAccount} from './manageAccount'
import {manageBoard} from './manageBoard'
import {manageLogin} from './manageLogin'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  account: manageAccount,
  board: manageElements,
  manageLogin: manageLogin,
  boardAttributes: manageBoard
})

export default rootReducer
