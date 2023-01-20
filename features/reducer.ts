import { combineReducers } from '@reduxjs/toolkit'

import appSlice from './app/slice'

const reducer = combineReducers({
  app: appSlice.reducer,
})

export default reducer
