import { combineReducers } from '@reduxjs/toolkit'

import appSlice from './app/slice'
import userSlice from './user/slice'

const reducer = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
})

export default reducer
