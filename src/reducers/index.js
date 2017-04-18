import {manageElements} from './manageElements'
import {manageAccount} from './manageAccount'
import {manageBoard} from './manageBoard'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  account: manageAccount,
  board: manageElements,
  currentBoard: manageBoard
})

export default rootReducer
