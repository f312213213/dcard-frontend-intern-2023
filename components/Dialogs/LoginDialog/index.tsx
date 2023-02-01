import { Portal, Root } from '@radix-ui/react-dialog'

import {
  StyledDialogContent,
  StyledDialogDescription,
  StyledDialogOverlay,
  StyledDialogTitle
} from '@/components/Dialogs/LoginDialog/styles'
import GitHubLogin from '@/components/GitHubLogin'

const Index = () => {
  return (
    <Root open>
      <Portal>
        <StyledDialogOverlay />
        <StyledDialogContent >
          <StyledDialogTitle>
            To use this app
          </StyledDialogTitle>
          <StyledDialogDescription>
            <GitHubLogin />
          </StyledDialogDescription>
        </StyledDialogContent>
      </Portal>
    </Root>
  )
}

export default Index
