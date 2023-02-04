import { IRepo } from '@/features/user/interface'
import { StyledSidebarFilterLink, StyledSidebarWrapper } from '@/components/Sidebar/styles'
import { useRouter } from 'next/router'
import RepoSelect from '@/components/Sidebar/RepoSelect'

interface IProps {
  reposData: IRepo[]
}

const issueFilters = [
  {
    type: 'all-issue',
    text: 'All issues',
  },
  {
    type: 'my-open-issue',
    text: 'My open issues',
  },
  {
    type: 'done-issue',
    text: 'Done issues',
  },
]

const Sidebar = ({ reposData }: IProps) => {
  const router = useRouter()
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
