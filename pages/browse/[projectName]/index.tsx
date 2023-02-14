import { selectedProjectSelector } from '@/features/task/selector'
import { useAppSelector, wrapper } from '@/features/store'
import BrowseProjectPageContainer from '@/containers/BrowseProjectPageContainer'
import Layout from '@/components/Layout'
import apiRequest from '@/apis/apiClient'
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { projectName: repo } = context.query
  const rootStore = store.getState()
  const isLogin = !!rootStore.user.userData
  if (!isLogin) {
    return {
      props: {},
    }
  }
  const username = rootStore.user.userData?.username
  const { success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${username || ''}/${repo}`,
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
})
