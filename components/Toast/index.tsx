import { FaTimes } from 'react-icons/fa/'
import { Provider } from '@radix-ui/react-toast'

import { EToastType } from '@/features/app/interface'
import {
  StyledToastCloseButton,
  StyledToastContainer, StyledToastRoot,
  StyledToastTitle,
  StyledToastViewport
} from '@/components/Toast/styles'

interface IToastRootProps {
  title: string
  type: EToastType
  open: boolean
  onOpenChange: (open: boolean) => void
}

const Toast = ({
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
