import { isLoginSelector, userDataSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'

const HomePageContainer = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const userData = useAppSelector(userDataSelector)

  if (!isLogin) {
    return (
      <div>
        {/* TODO 做沒有登入時的 skeleton */}
      </div>
    )
  }

  return (
    <p>登入啦！ hi! {userData.username}</p>
  )
}

export default HomePageContainer
