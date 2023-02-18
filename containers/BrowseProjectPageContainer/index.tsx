import { StyledBrowseProjectPageTitle, StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { getRepoIssueData } from '@/features/repo/services'
import { isLoginSelector } from '@/features/user/selector'
import { selectedProjectSelector, selectedProjectTasksByProjectNameSelector } from '@/features/repo/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import IssueTable from '../IssueTable'

const BrowseProjectPageContainer = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const selectedProject = useAppSelector(selectedProjectSelector)
  const selectedProjectTasks = useAppSelector(selectedProjectTasksByProjectNameSelector(selectedProject))
  const dispatch = useAppDispatch()

  if (!isLogin) return <StyledBrowseProjectPageView/>

  return (
    <StyledBrowseProjectPageView>
      <StyledBrowseProjectPageTitle>
        {selectedProject}
      </StyledBrowseProjectPageTitle>

      <IssueTable
        loadMore={() => dispatch(getRepoIssueData())}
        selectedProjectTasks={selectedProjectTasks}
      />
    </StyledBrowseProjectPageView>
  )
}

export default BrowseProjectPageContainer
