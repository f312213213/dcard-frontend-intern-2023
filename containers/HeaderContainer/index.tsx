import { isLoginSelector, userDataSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import Header from '@/components/Header'

const HeaderContainer = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const userData = useAppSelector(userDataSelector)

  return (
    <Header
      isLogin={isLogin}
      userData={userData}
    />
  )
}

export default HeaderContainer
