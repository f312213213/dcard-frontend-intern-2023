import { combineReducers, createAction } from '@reduxjs/toolkit'

import { HYDRATE } from 'next-redux-wrapper'
import { RootState } from '@/features/store'
import appSlice from './app/slice'
import userSlice from './user/slice'

export const APP_HYDRATE = createAction<RootState>(HYDRATE)

const reducer = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
})

export default reducer
