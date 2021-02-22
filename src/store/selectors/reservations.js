import { reservationsAdapter } from '@store/toolkit/reservations'
import { createSelector } from 'reselect'
import rootStore from '../'

export const getState = (state) => state

const reservationsSelector = reservationsAdapter.getSelectors(
  (state) => state.reservations
)

export const getReservationsList = createSelector(
  getState,
  state => reservationsSelector.selectAll(state)
)
