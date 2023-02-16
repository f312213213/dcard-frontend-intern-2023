import { isLoginSelector, userDataSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/Header'), { ssr: false })

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
