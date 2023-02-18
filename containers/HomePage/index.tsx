import { StyledBrowseProjectPageTitle, StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { isLoginSelector } from '@/features/user/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect } from 'react'
import IssueTable from '@/containers/IssueTable'
import useIsMounted from '@/hooks/useIsMounted'

const HomePageContainer = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const dispatch = useAppDispatch()
  const isMounted = useIsMounted()

  return (
    <StyledBrowseProjectPageView>
      <StyledBrowseProjectPageTitle>
        {isLogin && 'All Task'}
      </StyledBrowseProjectPageTitle>

      {/* <IssueTable */}
      {/*  loadMore={() => dispatch(getAllIssueData())} */}
      {/*  selectedProjectTasks={selectedProjectTasks} */}
      {/* /> */}
    </StyledBrowseProjectPageView>
  )
}

export default HomePageContainer
