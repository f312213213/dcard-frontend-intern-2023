import { IRepo } from '@/features/user/interface'
import { StyledSidebarFilterLink, StyledSidebarWrapper } from '@/components/Sidebar/styles'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import RepoSelect from '@/components/Sidebar/RepoSelect'

interface IProps {
  reposData: IRepo[]
}

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

const Sidebar = ({ reposData }: IProps) => {
  const router = useRouter()
  const { filter } = router.query
  useEffect(() => {
    console.log(filter)
  }, [filter])
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

export default Sidebar
