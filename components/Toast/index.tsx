import { FaTimes } from 'react-icons/fa/'
import { Provider } from '@radix-ui/react-toast'

import { EToastType } from '@/features/app/interface'
import {
  StyledToastCloseButton,
  StyledToastContainer, StyledToastRoot,
  StyledToastTitle,
  StyledToastViewport
} from '@/components/Toast/styles'
import { closeToast } from '@/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'

const Toast = () => {
  const toast = useAppSelector(state => state.app.toast)
  const dispatch = useAppDispatch()

  const parseCloseToast = (open: boolean) => {
    if (!open) {
      dispatch(closeToast())
    }
  }

  return (
    <ToastRoot
      title={toast.title}
      open={!!toast.title}
      type={toast.type}
      onOpenChange={parseCloseToast}
    />
  )
}

interface IToastRootProps {
  title: string
  type: EToastType
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ToastRoot = ({
  title,
  type,
  open,
  onOpenChange,
}: IToastRootProps) => {
  const selectToastColor = (toastType: EToastType) => {
    switch (toastType) {
      case EToastType.ERROR: {
        return '#ea5c5c'
      }
      case EToastType.SUCCESS:
      default: {
        return '#49bd69'
      }
    }
  }
  return (
    <Provider swipeDirection={'right'}>
      <StyledToastRoot
        open={open}
        onOpenChange={onOpenChange}
      >
        <StyledToastContainer background={selectToastColor(type)}>
          <StyledToastTitle>
            {title}
          </StyledToastTitle>

          <StyledToastCloseButton>
            <FaTimes />
          </StyledToastCloseButton>
        </StyledToastContainer>
      </StyledToastRoot>
      <StyledToastViewport />
    </Provider>
  )
}

export default Toast
