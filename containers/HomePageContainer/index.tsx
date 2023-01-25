import { isLoginSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import SidebarContainer from '@/containers/SidebarContainer'

const HomePageContainer = () => {
  const isLogin = useAppSelector(isLoginSelector)

  if (!isLogin) {
    return (
      <div>
        {/* TODO 做沒有登入時的 skeleton */}
      </div>
    )
  }

  return (
    <>
      <SidebarContainer />
    </>
  )
}

export default HomePageContainer
