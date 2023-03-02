import { EPageContentType } from '@/constants/pageContentType'
import { GetServerSideProps } from 'next'
import { getRepoIssueData } from '@/features/repo/services'
import { parseCookie } from '@/utilis/auth'
import { selectedProjectSelector, selectedProjectTasksByProjectNameSelector } from '@/features/repo/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import apiRequest, { setupApiCallerAuth } from '@/apis/apiClient'
import dynamic from 'next/dynamic'
import useCleanupCode from '@/hooks/useCleanupCode'

const PageContentContainer = dynamic(() => import('@/containers/PageContent'), { ssr: false })

const BrowseProjectPage = () => {
  useCleanupCode()
  const router = useRouter()
  const selectedProject = useAppSelector(selectedProjectSelector)
  const selectedProjectTasks = useAppSelector(selectedProjectTasksByProjectNameSelector(selectedProject))
  const dispatch = useAppDispatch()
  const meta = {
    title: `${selectedProject || 'Login to use this app'} - Github Task Tracker`,
    description: 'Github Task Tracker - 2023 Dcard frontend intern homework.',
    image: '',
    type: 'website',
  }

  const { filter = '', order = '' } = router.query

  return (
    <Layout
      customMeta={meta}
    >
      <PageContentContainer
        contentData={selectedProjectTasks}
        displayText={selectedProject}
        pageContentType={EPageContentType.ISSUE_TABLE}
        tableReachEnd={() => dispatch(getRepoIssueData(filter as string, order as string))}
      />
    </Layout>
  )
}

export default BrowseProjectPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { projectName, projectOwner } = context.query
  const { accessToken } = parseCookie(context.req.headers.cookie || '')
  if (!accessToken) {
    return {
      props: {},
    }
  }
  setupApiCallerAuth({ accessToken })
  const { success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${projectOwner}/${projectName}`,
  })
  if (!success) {
    return {
      notFound: true,
      props: {},
    }
  }
  return {
    props: {},
  }
}
