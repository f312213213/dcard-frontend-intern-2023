import { GetServerSideProps } from 'next'
import { parseCookie } from '@/utilis/auth'
import { selectedProjectSelector } from '@/features/repo/selector'
import { useAppSelector } from '@/features/store'
import BrowseProjectPageContainer from '@/containers/BrowseProjectPageContainer'
import Layout from '@/components/Layout'
import apiRequest, { setupApiCallerAuth } from '@/apis/apiClient'
import useCleanupCode from '@/hooks/useCleanupCode'

const BrowseProjectPage = () => {
  useCleanupCode()
  const selectedProject = useAppSelector(selectedProjectSelector)
  const meta = {
    title: `${selectedProject || 'Login to use this app'} - Github Task Tracker`,
    description: 'Github Task Tracker - 2023 Dcard frontend intern homework.',
    image: '',
    type: 'website',
  }
  return (
    <Layout
      customMeta={meta}
    >
      <BrowseProjectPageContainer />
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
