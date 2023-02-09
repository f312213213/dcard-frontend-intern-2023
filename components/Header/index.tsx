import { IUserData } from '@/features/user/interface'
import { StyledHeader, StyledHeaderText } from '@/components/Header/styles'

interface IProps {
  isLogin: boolean
  userData: IUserData | null
}

const Header = ({ isLogin, userData }: IProps) => {
  return (
    <StyledHeader>
      <StyledHeaderText>
        GITHUB
      </StyledHeaderText>

      {
        isLogin &&
          <StyledHeaderText>
            hi {userData?.username}
          </StyledHeaderText>
      }
    </StyledHeader>
  )
}

export default Header
