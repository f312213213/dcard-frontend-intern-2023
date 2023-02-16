/* eslint-disable camelcase */

import { isLoginSelector } from '@/features/user/selector'
import { useAppSelector, wrapper } from '@/features/store'
import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'
import useCleanupCode from '@/hooks/useCleanupCode'

const HomePageContainer = dynamic(() => import('@/containers/HomePage'))

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
