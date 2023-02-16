import { StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { StyledIssueTableEmpty } from '@/containers/IssueTable/styles'
import Layout from '@/components/Layout'

const notFoundPage = () => {
  return (
    <Layout
      customMeta={{
        title: '404 - Github Task Tracker',
      }}
    >
      <StyledBrowseProjectPageView>
        <StyledIssueTableEmpty>
          This page {'can\'t'} been found on server!
        </StyledIssueTableEmpty>
      </StyledBrowseProjectPageView>
    </Layout>
  )
}

export default notFoundPage
