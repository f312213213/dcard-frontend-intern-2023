/* eslint-disable camelcase */

import { isLoginSelector } from '@/features/user/selector'
import { useAppSelector, wrapper } from '@/features/store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import HomePageContainer from '@/containers/HomePageContainer'
import Layout from '@/components/Layout'

const HomePage = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const router = useRouter()
  useEffect(() => {
    const { code } = router.query
    if (code) {
      router.replace('/')
    }
  }, [])
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
