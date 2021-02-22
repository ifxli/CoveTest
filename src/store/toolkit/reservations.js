import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchReservations = createAsyncThunk(
  'reservations/list',
  async () => await (await fetch('https://cove-coding-challenge-api.herokuapp.com/reservations')).json()
)

export const reservationsAdapter = createEntityAdapter({
  selectId: reservation => reservation.id,
  sortComparer: (a, b) => a.room.id.localeCompare(b.room.id)
})

const slice = createSlice({
  name: 'reservations',
  initialState: reservationsAdapter.getInitialState({
    isLoading: false,
    error: null
  }),
  reducers: {
    updateReservation: reservationsAdapter.updateOne,
    addReservation: reservationsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.fulfilled, (state, { payload }) => {
      reservationsAdapter.setAll(state, payload)
    })
  },
})

const reducer = slice.reducer
export default reducer

export const { updateReservation, addReservation } = slice.actions
