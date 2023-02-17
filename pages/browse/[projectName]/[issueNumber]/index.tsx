import { wrapper } from '@/features/store'
import Layout from '@/components/Layout'
import apiRequest from '@/apis/apiClient'
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

    </Layout>
  )
}

export default BrowseIssuePage

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const rootStore = store.getState()
  const isLogin = !!rootStore.user.userData
  if (!isLogin) {
    return {
      props: {},
    }
  }
  const username = rootStore.user.userData?.username
  const { projectName: repo, issueNumber } = context.query

  const repoIndex = rootStore.user.userData?.repos.findIndex((repo) => repo.repoName === context.query.projectName)
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${rootStore.user.userData?.repos[repoIndex]?.repoOwner}/${repo}/issues/${issueNumber}`,
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
        repoName: repo,
        issueNumber,
        issueTitle: data.title,
        ...data,
      },
    },
  }
})
