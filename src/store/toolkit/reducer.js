import { combineReducers } from 'redux'
import reservations from './reservations'
import rooms from './rooms'

export default combineReducers({
  reservations,
  rooms
})