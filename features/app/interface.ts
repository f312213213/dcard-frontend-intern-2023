import { ReactNode } from 'react'

export enum EAppStatus {
  INITIAL= 'INITIAL',
  SUCCESS= 'SUCCESS',
  FAILURE= 'FAILURE',
  PENDING= 'PENDING',
}

export interface IBasicDialog {
  open: boolean
  title: string
  content?: string | ReactNode
  onDialogLoad?: () => void,
  onDialogClose?: () => void,
}

export enum EDialogType {
  ALERT = 'ALERT',
  INFO = 'INFO',
  INPUT = 'INPUT'
}

export interface IAlertDialog extends IBasicDialog {
  onConfirm?: (onConfirmData?: {}) => void,
}

export interface IInfoDialog extends IBasicDialog {
}

export interface IInputDialog extends IBasicDialog {
  onConfirm?: (onConfirmData?: {}) => void,
}

export enum EToastType {
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface IToast {
  type: EToastType
  title: string
}

export interface IDialog {
  [EDialogType.ALERT]: IAlertDialog
  [EDialogType.INFO]: IInfoDialog
  [EDialogType.INPUT]: IInputDialog
}

export interface IState {
  status: EAppStatus
  dialog: IDialog
  toast: IToast
  backdrop: {
    show: boolean
  }
}

export interface IOpenDialogAction {
  title: string
  content?: string | ReactNode,
  type: EDialogType
  onDialogLoad?: () => void
  onDialogClose?: () => void
  onConfirm?: () => void
}

export interface ICloseDialogAction {
  type: EDialogType
}
