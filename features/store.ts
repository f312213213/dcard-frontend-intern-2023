import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { Store } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore, createAction } from '@reduxjs/toolkit'
import reducer from './reducer'

export const makeStore = () => configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
})

const store = makeStore()

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch | any

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: false })
