import { HYDRATE } from 'next-redux-wrapper'
import { IState } from '@/features/user/interface'
import { RootState } from '@/features/store'
import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  userData: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { userData } = action.payload
      state.userData = userData
    },
    userLogout: (state, action) => {
      state.userData = initialState.userData
    },
  },
})

export const {
  userLogin,
  userLogout,
} = userSlice.actions

export default userSlice
