import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { wrapper } from '@/features/store'
import Layout from '@/components/Layout'
import apiRequest from '@/apis/apiClient'

const BrowseIssuePage = ({ issue }: {issue: any}) => {
  const router = useRouter()
  const meta = {
    title: `${(issue?.issueTitle && issue?.repoName)
      ? (issue?.issueTitle + ' - ' + issue?.repoName)
      : 'Login to use this app'} 
      - Github Task Tracker`,
    description: 'Github Task Tracker - 2023 Dcard frontend intern homework.',
    image: '',
    type: 'website',
  }
  const { projectName, issueNumber, code } = router.query
  useEffect(() => {
    if (!code) return
    router.push(`/browse/${projectName}/${issueNumber}`, undefined, { shallow: true })
  }, [])
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
  const { projectName: repo, issueNumber } = context.query
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/f312213213/${repo}/issues/${issueNumber}`,
  })
  if (!success) {
    return {
      notFound: true,
    }
  }

  console.log(data)
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
