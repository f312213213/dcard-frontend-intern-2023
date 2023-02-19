import { EIssueStatus } from '@/constants/issueLabel'
import { StyledSidebarFilterLink, StyledSidebarLoader, StyledSidebarWrapper } from './styles'
import { isLoginSelector } from '@/features/user/selector'
import { repoDataSelector, selectedProjectSelector } from '@/features/repo/selector'
import { restoreRepoData, restoreSearchData } from '@/features/repo/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import RepoSelect from './components/RepoSelect'

const issueFilters = [
  {
    type: 'all',
    text: 'All issues',
  },
  {
    type: EIssueStatus.OPEN,
    text: 'Open issues',
  },
  {
    type: EIssueStatus.IN_PROGRESS,
    text: 'In progress issues',
  },
  {
    type: EIssueStatus.DONE,
    text: 'Done issues',
  },
]

const SidebarContainer = () => {
  const reposData = useAppSelector(repoDataSelector)
  const isLogin = useAppSelector(isLoginSelector)
  const projectName = useAppSelector(selectedProjectSelector)
  const dispatch = useAppDispatch()
  const router = useRouter()
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
              onClick={() => {
                if (router.pathname === '/') {
                  dispatch(restoreSearchData())
                } else {
                  dispatch(restoreRepoData({ projectName }))
                }
              }}
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
