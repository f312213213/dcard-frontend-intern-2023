/* eslint-disable camelcase */

import { useEffect } from 'react'
import { useRouter } from 'next/router'

import HomePageContainer from '@/containers/HomePageContainer'
import Layout from '@/components/Layout'
import getServerSideProps from '@/libs/authedServerProps'

const HomePage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/', undefined, { shallow: true })
  }, [])

  return (
    <Layout>
      <HomePageContainer />
    </Layout>
  )
}

export default HomePage

export { getServerSideProps }
