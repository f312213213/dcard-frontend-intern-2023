import { HYDRATE } from 'next-redux-wrapper'
import { IState } from '@/features/user/interface'
import { RootState } from '@/features/store'
import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  userData: null,
}

export const APP_HYDRATE = createAction<RootState>(HYDRATE)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { userData } = action.payload
      state.userData = userData
    },
  },
  extraReducers: (builder) => {
    builder.addCase(APP_HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.user,
    }))
  },
})

export const {
  userLogin,
} = userSlice.actions

export default userSlice
