import { wrapper } from '@/features/store'
import Layout from '@/components/Layout'

const BrowseIssuePage = () => {
  return (
    <Layout>

    </Layout>
  )
}

export default BrowseIssuePage

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  return {
    props: {},
  }
})
