import { StyledSidebarWrapper } from '@/components/Sidebar/styles'
import { isLoginSelector, reposDataSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import Sidebar from '@/components/Sidebar'

const SidebarContainer = () => {
  const reposData = useAppSelector(reposDataSelector)
  const isLogin = useAppSelector(isLoginSelector)
  if (!isLogin) {
    return (
      <StyledSidebarWrapper style={{
        backgroundColor: 'white',
      }} />
    )
  }

  if (!reposData) return null
  return (
    <Sidebar reposData={reposData} />
  )
}

export default SidebarContainer
