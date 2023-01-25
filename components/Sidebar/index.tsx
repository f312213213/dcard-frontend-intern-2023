import { IRepo } from '@/features/user/interface'
import { StyledSidebarWrapper } from '@/components/Sidebar/styles'
import RepoSelect from '@/components/Sidebar/RepoSelect'

interface IProps {
  reposData: IRepo[]
}

const Sidebar = ({ reposData }: IProps) => {
  return (
    <StyledSidebarWrapper>
      <RepoSelect reposData={reposData} />
    </StyledSidebarWrapper>
  )
}

export default Sidebar
