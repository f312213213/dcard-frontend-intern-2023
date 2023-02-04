import { StyledBrowseProjectPageTitle, StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { getIssueData } from '@/features/task/services'
import { selectedProjectSelector, selectedProjectTasksSelector } from '@/features/task/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect } from 'react'
import IssueTable from '@/components/IssueTable'
import useIsMounted from '@/hooks/useIsMounted'

const BrowseProjectPageContainer = () => {
  const selectedProject = useAppSelector(selectedProjectSelector)
  const selectedProjectTasks = useAppSelector(selectedProjectTasksSelector)
  const dispatch = useAppDispatch()
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isMounted) {
      dispatch(getIssueData())
    }
  }, [selectedProject, isMounted, dispatch])

  return (
    <StyledBrowseProjectPageView>
      <StyledBrowseProjectPageTitle>
        {selectedProject}
      </StyledBrowseProjectPageTitle>

      <IssueTable selectedProjectTasks={selectedProjectTasks} />
    </StyledBrowseProjectPageView>
  )
}

export default BrowseProjectPageContainer
