import { Portal, Root } from '@radix-ui/react-dialog'

import {
  StyledDialogContent,
  StyledDialogDescription,
  StyledDialogOverlay,
  StyledDialogTitle
} from './styles'
import { alertDialogDataSelector } from '@/features/app/selector'
import { useAppSelector } from '@/features/store'

const AlertDialog = () => {
  const alertData = useAppSelector(alertDialogDataSelector)
  return (
    <Root open>
      <Portal>
        <StyledDialogOverlay />
        <StyledDialogContent >
          <StyledDialogTitle>
            {alertData.title}
          </StyledDialogTitle>
          <StyledDialogDescription>

          </StyledDialogDescription>
        </StyledDialogContent>
      </Portal>
    </Root>
  )
}

export default AlertDialog
