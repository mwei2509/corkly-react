import {manageElements} from './manageElements'
import {manageAccount} from './manageAccount'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  account: manageAccount,
  board: manageElements
})

export default rootReducer
