import { ReactNode } from 'react'

export enum EApiStatus {
  INITIAL= 'INITIAL',
  SUCCESS= 'SUCCESS',
  FAILURE= 'FAILURE',
  LOADING= 'LOADING',
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
  INPUT = 'INPUT',
  LOGIN = 'LOGIN',
  CREATE = 'CREATE',
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
  [EDialogType.LOGIN]: IBasicDialog
  [EDialogType.CREATE]: IBasicDialog
}

export interface IState {
  status: EApiStatus
  dialog: IDialog
  toast: IToast
  backdrop: {
    show: boolean
  }
}

export interface IOpenDialogAction {
  title?: string
  content?: string | ReactNode,
  type: EDialogType
  onDialogClose?: () => void
  onConfirm?: () => void
}

export interface ICloseDialogAction {
  type: EDialogType
}
