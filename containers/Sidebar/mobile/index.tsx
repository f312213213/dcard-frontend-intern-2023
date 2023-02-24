import { StyledMobileSidebar } from '@/containers/Sidebar/mobile/styles'
import { isLoginSelector } from '@/features/user/selector'
import { repoDataSelector } from '@/features/repo/selector'
import { useAppSelector } from '@/features/store'
import dynamic from 'next/dynamic'

const RepoSelect = dynamic(() => import('../components/RepoSelect'), { ssr: false })

const MobileSidebar = () => {
  const reposData = useAppSelector(repoDataSelector)
  const isLogin = useAppSelector(isLoginSelector)

  if (!isLogin) {
    return (
      <StyledMobileSidebar
        style={{
          padding: '0 4.5%',
        }}
      >
        <div
          style={{
            borderRadius: '10px',
            height: '60px',
            width: '100%',
            background: 'white',
          }}
        />
      </StyledMobileSidebar>
    )
  }

  return (
    <StyledMobileSidebar>
      <RepoSelect reposData={reposData} />
    </StyledMobileSidebar>
  )
}

export default MobileSidebar
