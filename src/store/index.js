import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@store/toolkit/reducer'

export default configureStore({
  reducer: rootReducer,
})
