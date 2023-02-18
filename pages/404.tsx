import { StyledIssueTableEmpty } from '@/containers/IssueTable/styles'
import { StyledPageContentView } from '@/containers/PageContent/styles'
import Layout from '@/components/Layout'

const notFoundPage = () => {
  return (
    <Layout
      customMeta={{
        title: '404 - Github Task Tracker',
      }}
    >
      <StyledPageContentView>
        <StyledIssueTableEmpty>
          This page {'can\'t'} been found on server!
        </StyledIssueTableEmpty>
      </StyledPageContentView>
    </Layout>
  )
}

export default notFoundPage
