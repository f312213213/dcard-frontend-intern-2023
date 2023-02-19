import { StyledSeparator, StyledSidebarFilterLink, StyledSidebarLoader, StyledSidebarWrapper } from './styles'
import { isLoginSelector } from '@/features/user/selector'
import { repoDataSelector, selectedProjectSelector } from '@/features/repo/selector'
import { restoreRepoData, restoreSearchData } from '@/features/repo/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const RepoSelect = dynamic(() => import('./components/RepoSelect'), { ssr: false })

const issueFilters = [
  {
    type: 'all',
    text: 'All issues',
  },
  {
    type: 'open',
    text: 'Open issues',
  },
  {
    type: 'in-progress',
    text: 'In progress issues',
  },
  {
    type: 'done',
    text: 'Done issues',
  },
]

const issueOrder = [
  {
    type: 'desc',
    text: 'Descending',
  },
  {
    type: 'asc',
    text: 'Ascending',
  },
]

const SidebarContainer = () => {
  const reposData = useAppSelector(repoDataSelector)
  const isLogin = useAppSelector(isLoginSelector)
  const projectName = useAppSelector(selectedProjectSelector)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { filter: filterInLink, order: orderInLink } = router.query

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
      <StyledSeparator />
      {
        issueFilters.map(filter => {
          return (
            <StyledSidebarFilterLink
              key={filter.type}
              onClick={() => {
                if (filterInLink === filter.type) return
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
      <StyledSeparator />
      {
        issueOrder.map(order => {
          return (
            <StyledSidebarFilterLink
              key={order.type}
              onClick={() => {
                if (orderInLink === order.type) return
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
                  order: order.type,
                },
              }}
              shallow
            >
              {order.text}
            </StyledSidebarFilterLink>
          )
        })
      }
    </StyledSidebarWrapper>
  )
}

export default SidebarContainer
