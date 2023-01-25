import { isLoginSelector, userDataSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import GitHubLogin from '@/components/GitHubLogin'

const HomePageContainer = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const userData = useAppSelector(userDataSelector)

  if (!isLogin) {
    return (
      <div>
      </div>
    )
  }

  return (
    <p>登入啦！ hi! {userData.login}</p>
  )
}

export default HomePageContainer
