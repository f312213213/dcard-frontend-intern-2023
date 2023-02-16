import { StyledBrowseProjectPageTitle, StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { getAllIssueData } from '@/features/task/services'
import { isLoginSelector } from '@/features/user/selector'
import { selectedProjectTasksSelector } from '@/features/task/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect } from 'react'
import IssueTable from '@/components/IssueTable'
import useIsMounted from '@/hooks/useIsMounted'

const HomePageContainer = () => {
  const selectedProjectTasks = useAppSelector(selectedProjectTasksSelector)
  const isLogin = useAppSelector(isLoginSelector)
  const dispatch = useAppDispatch()
  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted && isLogin) {
      dispatch(getAllIssueData())
    }
  }, [isMounted])
  return (
    <StyledBrowseProjectPageView>
      <StyledBrowseProjectPageTitle>
        {isLogin && 'All Task'}
      </StyledBrowseProjectPageTitle>

      <IssueTable
        loadMore={() => dispatch(getAllIssueData())}
        selectedProjectTasks={selectedProjectTasks}
      />
    </StyledBrowseProjectPageView>
  )
}

export default HomePageContainer
