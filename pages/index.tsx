/* eslint-disable camelcase */

import { EPageContentType } from '@/constants/pageContentType'
import { getSearchResult } from '@/features/repo/services'
import { isLoginSelector } from '@/features/user/selector'
import { searchResultSelector } from '@/features/repo/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'
import useCleanupCode from '@/hooks/useCleanupCode'

const PageContentContainer = dynamic(() => import('@/containers/PageContent'))

const HomePage = () => {
  useCleanupCode()
  const isLogin = useAppSelector(isLoginSelector)
  const searchResult = useAppSelector(searchResultSelector)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const loadMore = () => {
    dispatch(getSearchResult(router.query?.q as string))
  }

  return (
    <Layout
      customMeta={{
        title: `${isLogin ? 'Homepage' : 'Login to use this app'} - Github Task Tracker`,
      }}
    >
      <PageContentContainer
        pageContentType={EPageContentType.SEARCH_RESULT}
        tableEmptyText={'暫無搜尋結果'}
        displayText={`Search${router.query?.q && ' :' + router.query?.q}`}
        contentData={searchResult}
        tableReachEnd={loadMore}
      />
    </Layout>
  )
}

export default HomePage

export const getServerSideProps = () => {
  return {
    props: {

    },
  }
}
