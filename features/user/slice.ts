import { APP_HYDRATE } from '@/features/reducer'
import { IState } from '@/features/user/interface'
import { createSlice } from '@reduxjs/toolkit'

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
  extraReducers: (builder) => {
    builder.addCase(APP_HYDRATE, (state, action) => ({
      ...state,
      ...action.payload.user,
    }))
  },
})

export const {
  userLogin,
  userLogout,
} = userSlice.actions

export default userSlice
