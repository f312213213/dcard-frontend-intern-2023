import { closeBackdrop, initApp, showBackdrop } from '@/features/app/slice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getNumber = createAsyncThunk(
  'app/getNumber',
  async (input, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    dispatch(showBackdrop())
    try {
      const response = await fetch('https://counter-tmqvi7b1k-f312213213.vercel.app/')
      dispatch(closeBackdrop())
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const number = await response.json()
      fulfillWithValue(number)
    } catch (err: any) {
      rejectWithValue(err.message)
    }
    dispatch(initApp())
  }
)
