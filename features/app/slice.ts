import {
  EAppStatus,
  EDialogType,
  EToastType,
  ICloseDialogAction,
  IOpenDialogAction,
  IState
} from '@/features/app/interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const basicDialog = {
  open: false,
  title: '',
}

const initialState: IState = {
  status: EAppStatus.INITIAL,
  dialog: {
    [EDialogType.ALERT]: basicDialog,
    [EDialogType.INFO]: basicDialog,
    [EDialogType.INPUT]: basicDialog,
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
        onDialogLoad,
        onDialogClose,
        onConfirm,
      } = action.payload

      state.dialog[type].open = true
      state.dialog[type].title = title
      if (content) {
        state.dialog[type].content = content
      }
      if (onDialogLoad) {
        state.dialog[type].onDialogLoad = onDialogLoad
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
    showBackdrop: (state) => {
      state.backdrop.show = true
    },
    closeBackdrop: (state) => {
      state.backdrop = initialState.backdrop
    },
    initApp: state => {
      state.status = EAppStatus.SUCCESS
    },
  },
})

export const {
  openDialog,
  closeDialog,
  openToast,
  closeToast,
  showBackdrop,
  closeBackdrop,
  initApp,
} = appSlice.actions

export default appSlice
