import { EApiStatus, EDialogType } from '@/features/app/interface'
import { RootState } from '@/features/store'

export const isAppInitiatedSelector = (state: RootState) => state.app.status === EApiStatus.SUCCESS

export const isAlertDialogOpenSelector = (state: RootState) => state.app.dialog[EDialogType.ALERT].open

export const alertDialogDataSelector = (state: RootState) => state.app.dialog[EDialogType.ALERT]

export const isLoginDialogOpenSelector = (state: RootState) => state.app.dialog[EDialogType.LOGIN].open

export const isNewLoginDialogOpenSelector = (state: RootState) => state.app.dialog[EDialogType.CREATE].open
