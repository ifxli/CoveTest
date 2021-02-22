import { roomsAdapter } from '@store/toolkit/rooms'
import { createSelector } from 'reselect'
import rootStore from '../'

export const getState = (state) => state

const roomsSelector = roomsAdapter.getSelectors(
  (state) => state.rooms
)

export const getRoomsList = createSelector(
  getState,
  state => roomsSelector.selectAll(state)
)
