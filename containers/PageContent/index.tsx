import { EPageContentType } from '@/constants/pageContentType'
import { StyledBrowseProjectPageTitle, StyledPageContentView } from '@/containers/PageContent/styles'
import { isLoginSelector } from '@/features/user/selector'
import { selectedProjectSelector, selectedProjectTasksByProjectNameSelector } from '@/features/repo/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useMemo } from 'react'
import IssueTable from '../IssueTable'
import SingleIssueView from '@/containers/SingleIssueView'

interface IPageContentProps {
  displayText: string
  pageContentType: EPageContentType
  tableReachEnd?: any
  tableEmptyText?: string
  contentData: any
}

const PageContentContainer = ({
  displayText,
  pageContentType,
  tableReachEnd,
  tableEmptyText,
  contentData,
}: IPageContentProps) => {
  const isLogin = useAppSelector(isLoginSelector)

  const renderPageContent = () => {
    switch (pageContentType) {
      case EPageContentType.SINGLE_ISSUE:{
        return (
          <SingleIssueView contentData={contentData} />
        )
      }
      case EPageContentType.SEARCH_RESULT:{
        return (
          <>
            <StyledBrowseProjectPageTitle>
              {displayText}
            </StyledBrowseProjectPageTitle>
            <IssueTable
              tableEmptyText={tableEmptyText}
              loadMore={tableReachEnd}
              selectedProjectTasks={contentData}
            />
          </>
        )
      }
      case EPageContentType.ISSUE_TABLE:
      default: {
        return (
          <>
            <StyledBrowseProjectPageTitle>
              {displayText}
            </StyledBrowseProjectPageTitle>
            <IssueTable
              tableEmptyText={tableEmptyText}
              loadMore={tableReachEnd}
              selectedProjectTasks={contentData}
            />
          </>
        )
      }
    }
  }

  if (!isLogin) return <StyledPageContentView/>

  return (
    <StyledPageContentView>
      {renderPageContent()}
    </StyledPageContentView>
  )
}

export default PageContentContainer
