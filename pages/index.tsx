/* eslint-disable camelcase */

import { wrapper } from '@/features/store'
import HomePageContainer from '@/containers/HomePageContainer'
import Layout from '@/components/Layout'

const HomePage = () => {
  return (
    <Layout>
      <HomePageContainer />
    </Layout>
  )
}

export default HomePage

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  return {
    props: {},
  }
})
