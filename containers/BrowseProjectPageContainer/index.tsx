import { StyledBrowseProjectPageTitle, StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { getIssueData } from '@/features/task/services'
import { selectedProjectSelector, selectedProjectTasksSelector } from '@/features/task/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import IssueTable from '@/components/IssueTable'

const BrowseProjectPageContainer = () => {
  const selectedProject = useAppSelector(selectedProjectSelector)
  const selectedProjectTasks = useAppSelector(selectedProjectTasksSelector)
  const dispatch = useAppDispatch()

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
