import { StyledBrowseProjectPageTitle, StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { getIssueData } from '@/features/task/services'
import { isLoginSelector } from '@/features/user/selector'
import { selectedProjectSelector, selectedProjectTasksSelector } from '@/features/task/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import IssueTable from '../IssueTable'

const BrowseProjectPageContainer = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const selectedProject = useAppSelector(selectedProjectSelector)
  const selectedProjectTasks = useAppSelector(selectedProjectTasksSelector)
  const dispatch = useAppDispatch()

  if (!isLogin) return <StyledBrowseProjectPageView/>

  return (
    <StyledBrowseProjectPageView>
      <StyledBrowseProjectPageTitle>
        {selectedProject}
      </StyledBrowseProjectPageTitle>

      <IssueTable
        loadMore={() => dispatch(getIssueData())}
        selectedProjectTasks={selectedProjectTasks}
      />
    </StyledBrowseProjectPageView>
  )
}

export default BrowseProjectPageContainer
