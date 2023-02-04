import { selectedProjectSelector } from '@/features/task/selector'
import { useAppSelector, wrapper } from '@/features/store'
import BrowseProjectPageContainer from '@/containers/BrowseProjectPageContainer'
import Layout from '@/components/Layout'

const BrowseProjectPage = () => {
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
  return {
    props: {},
  }
})
