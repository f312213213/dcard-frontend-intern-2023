import {
  EApiStatus,
  EDialogType,
  EToastType,
  ICloseDialogAction,
  IOpenDialogAction,
  IState
} from '@/features/app/interface'
import { HYDRATE } from 'next-redux-wrapper'
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/features/store'

const basicDialog = {
  open: false,
  title: '',
}

const initialState: IState = {
  status: EApiStatus.INITIAL,
  dialog: {
    [EDialogType.ALERT]: basicDialog,
    [EDialogType.INFO]: basicDialog,
    [EDialogType.INPUT]: basicDialog,
    [EDialogType.LOGIN]: basicDialog,
    [EDialogType.CREATE]: basicDialog,
  },
  toast: {
    type: EToastType.INITIAL,
    title: '',
  },
  backdrop: {
    show: false,
  },
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    closeDialog: (state, action: PayloadAction<ICloseDialogAction>) => {
      const { type } = action.payload
      state.dialog[type] = initialState.dialog[type]
    },
    openDialog: (state, action: PayloadAction<IOpenDialogAction>) => {
      const {
        title = '',
        content,
        type = EDialogType.INFO,
        onDialogClose,
        onConfirm,
      } = action.payload

      state.dialog[type].open = true
      state.dialog[type].title = title
      if (content) {
        state.dialog[type].content = content
      }
      if (onDialogClose) {
        state.dialog[type].onDialogClose = onDialogClose
      }
      if (onConfirm && type === EDialogType.ALERT) {
        state.dialog[type].onConfirm = onConfirm
      }
    },
    openToast: (state, action) => {
      const { type = EToastType.INITIAL, title = '' } = action.payload
      state.toast.type = type
      state.toast.title = title
    },
    closeToast: (state) => {
      state.toast = initialState.toast
    },
    openBackdrop: (state) => {
      state.backdrop.show = true
    },
    closeBackdrop: (state) => {
      state.backdrop = initialState.backdrop
    },
    appInitiated: state => {
      state.status = EApiStatus.SUCCESS
      state.backdrop = initialState.backdrop
    },
  },
})

export const {
  openDialog,
  closeDialog,
  openToast,
  closeToast,
  openBackdrop,
  closeBackdrop,
  appInitiated,
} = appSlice.actions

export default appSlice
