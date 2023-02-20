import { EPageContentType } from '@/constants/pageContentType'
import { StyledBrowseProjectPageTitle, StyledPageContentView } from '@/containers/PageContent/styles'
import { isLoginSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import dynamic from 'next/dynamic'

const IssueTable = dynamic(() => import('../IssueTable'), { ssr: false })
const SingleIssueView = dynamic(() => import('@/containers/SingleIssueView'), { ssr: false })

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
              pageContentType={EPageContentType.SEARCH_RESULT}
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
