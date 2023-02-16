/* eslint-disable camelcase */

import { isLoginSelector } from '@/features/user/selector'
import { useAppSelector, wrapper } from '@/features/store'
import HomePageContainer from '@/containers/HomePage'
import Layout from '@/components/Layout'
import useCleanupCode from '@/hooks/useCleanupCode'

const HomePage = () => {
  useCleanupCode()
  const isLogin = useAppSelector(isLoginSelector)
  return (
    <Layout
      customMeta={{
        title: `${isLogin ? 'Homepage' : 'Login to use this app'} - Github Task Tracker`,
      }}
    >
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
