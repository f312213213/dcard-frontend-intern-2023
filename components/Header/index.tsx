import { EDialogType } from '@/features/app/interface'
import { StyledCreatedIssueButton, StyledHeader, StyledHeaderText } from '@/components/Header/styles'
import { isLoginSelector, userDataSelector } from '@/features/user/selector'
import { openDialog } from '@/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'

const Header = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const userData = useAppSelector(userDataSelector)

  const dispatch = useAppDispatch()

  return (
    <StyledHeader>
      <StyledHeaderText>
        GITHUB
      </StyledHeaderText>

      {
        isLogin &&
          <>
            <StyledCreatedIssueButton
              onClick={() => {
                dispatch(openDialog({ type: EDialogType.CREATE }))
              }
              }
            >
              Create
            </StyledCreatedIssueButton>
            <StyledHeaderText>
              hi {userData?.username}
            </StyledHeaderText>
          </>
      }
    </StyledHeader>
  )
}

export default Header
