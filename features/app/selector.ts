import { EApiStatus, EDialogType } from '@/features/app/interface'
import { RootState } from '@/features/store'
import { createSelector } from '@reduxjs/toolkit'

export const isAppInitiatedSelector = (state: RootState) => state.app.status === EApiStatus.SUCCESS

export const isAlertDialogOpenSelector = createSelector(
  (state: RootState) => state.app.dialog[EDialogType.ALERT].open,
  (open) => open
)

export const isInfoDialogOpenSelector = createSelector(
  (state: RootState) => state.app.dialog[EDialogType.INFO].open,
  (open) => open
)

export const isInputDialogOpenSelector = createSelector(
  (state: RootState) => state.app.dialog[EDialogType.INPUT].open,
  (open) => open
)

export const isLoginDialogOpenSelector = (state: RootState) => state.app.dialog[EDialogType.LOGIN].open

export const isNewLoginDialogOpenSelector = (state: RootState) => state.app.dialog[EDialogType.CREATE].open
