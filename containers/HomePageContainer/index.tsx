import { StyledBrowseProjectPageTitle, StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { getAllIssueData } from '@/features/task/services'
import { selectedProjectTasksSelector } from '@/features/task/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect } from 'react'
import IssueTable from '@/components/IssueTable'
import useIsMounted from '@/hooks/useIsMounted'

const HomePageContainer = () => {
  const selectedProjectTasks = useAppSelector(selectedProjectTasksSelector)
  const dispatch = useAppDispatch()
  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) {
      dispatch(getAllIssueData())
    }
  }, [isMounted])
  return (
    <StyledBrowseProjectPageView>
      <StyledBrowseProjectPageTitle>
        All Task
      </StyledBrowseProjectPageTitle>

      <IssueTable
        loadMore={() => dispatch(getAllIssueData())}
        selectedProjectTasks={selectedProjectTasks}
      />
    </StyledBrowseProjectPageView>
  )
}

export default HomePageContainer
