import { GetServerSideProps } from 'next'
import { StyledBrowseProjectPageView } from '@/containers/BrowseProjectPageContainer/styles'
import { parseCookie } from '@/utilis/auth'
import Layout from '@/components/Layout'
import apiRequest, { setupApiCallerAuth } from '@/apis/apiClient'
import useCleanupCode from '@/hooks/useCleanupCode'

const BrowseIssuePage = ({ issue }: {issue: any}) => {
  useCleanupCode()
  const meta = {
    title: `${(issue?.issueTitle && issue?.repoName)
      ? (issue?.issueTitle + ' - ' + issue?.repoName)
      : 'Login to use this app'} 
      - Github Task Tracker`,
    description: 'Github Task Tracker - 2023 Dcard frontend intern homework.',
    image: '',
    type: 'website',
  }
  return (
    <Layout customMeta={meta}>
      <StyledBrowseProjectPageView/>
    </Layout>
  )
}

export default BrowseIssuePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { projectName, projectOwner, issueNumber } = context.query
  const { accessToken } = parseCookie(context.req.headers.cookie || '')
  if (!accessToken) {
    return {
      props: {},
    }
  }
  setupApiCallerAuth({ accessToken })

  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${projectOwner}/${projectName}/issues/${issueNumber}`,
  })
  if (!success) {
    return {
      notFound: true,
      props: {},
    }
  }

  return {
    props: {
      issue: {
        projectOwner,
        repoName: projectName,
        issueNumber,
        issueTitle: data.title,
        ...data,
      },
    },
  }
}
