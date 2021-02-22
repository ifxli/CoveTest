import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const roomsAdapter = createEntityAdapter({
  selectId: room => room.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const slice = createSlice({
  name: 'rooms',
  initialState: roomsAdapter.getInitialState({
    isLoading: false,
    error: null
  }),
  reducers: {
    addRoom: roomsAdapter.addOne,
  },
})

const reducer = slice.reducer
export default reducer

export const { addRoom } = slice.actions
