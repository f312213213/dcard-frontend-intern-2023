import { StyledSidebarFilterLink, StyledSidebarLoader, StyledSidebarWrapper } from './styles'
import { isLoginSelector } from '@/features/user/selector'
import { repoDataSelector } from '@/features/repo/selector'
import { useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import RepoSelect from './components/RepoSelect'

const issueFilters = [
  {
    type: 'all',
    text: 'All issues',
  },
  {
    type: 'open',
    text: 'My open issues',
  },
  {
    type: 'closed',
    text: 'Done issues',
  },
]

const SidebarContainer = () => {
  const reposData = useAppSelector(repoDataSelector)
  const isLogin = useAppSelector(isLoginSelector)
  const router = useRouter()
  const { filter } = router.query
  if (!isLogin) {
    return (
      <StyledSidebarWrapper style={{
        alignItems: 'center',
        left: '0.5%',
      }}>
        <StyledSidebarLoader />
      </StyledSidebarWrapper>
    )
  }

  if (!reposData) return null
  return (
    <StyledSidebarWrapper>
      <RepoSelect reposData={reposData} />
      {
        issueFilters.map(filter => {
          return (
            <StyledSidebarFilterLink
              key={filter.type}
              href={{
                pathname: router.pathname,
                query: {
                  ...router.query,
                  filter: filter.type,
                },
              }}
              shallow
            >
              {filter.text}
            </StyledSidebarFilterLink>
          )
        })
      }
    </StyledSidebarWrapper>
  )
}

export default SidebarContainer
