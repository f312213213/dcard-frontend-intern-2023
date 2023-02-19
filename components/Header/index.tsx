import { EDialogType } from '@/features/app/interface'
import { StyledCreatedIssueButton, StyledHeader, StyledHeaderText, StyledMiddleSection } from '@/components/Header/styles'
import { isLoginSelector, userDataSelector } from '@/features/user/selector'
import { openDialog } from '@/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import dynamic from 'next/dynamic'

const Search = dynamic(() => import('@/components/Header/Search'), { ssr: false })

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
            <StyledMiddleSection>
              <StyledCreatedIssueButton
                  onClick={() => {
                    dispatch(openDialog({ type: EDialogType.CREATE }))
                  }
                  }
              >
                Create
              </StyledCreatedIssueButton>
              <Search />
            </StyledMiddleSection>
            <StyledHeaderText>
              hi {userData?.username}
            </StyledHeaderText>
          </>
      }
    </StyledHeader>
  )
}

export default Header
