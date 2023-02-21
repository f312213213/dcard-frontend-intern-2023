/* eslint-disable camelcase */

import { EPageContentType } from '@/constants/pageContentType'
import { getSearchResult } from '@/features/repo/services'
import { isAppInitiatedSelector } from '@/features/app/selector'
import { isLoginSelector } from '@/features/user/selector'
import { restoreSearchData } from '@/features/repo/slice'
import { searchResultSelector } from '@/features/repo/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'
import useCleanupCode from '@/hooks/useCleanupCode'
import useIsMounted from '@/hooks/useIsMounted'

const PageContentContainer = dynamic(() => import('@/containers/PageContent'), { ssr: false })

const HomePage = () => {
  useCleanupCode()
  const appIsInit = useAppSelector(isAppInitiatedSelector)
  const isLogin = useAppSelector(isLoginSelector)
  const searchResult = useAppSelector(searchResultSelector)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isMounted = useIsMounted()

  const { q, filter, order } = router.query

  const loadMore = () => {
    dispatch(getSearchResult(q as string, filter as string, order as string))
  }

  useEffect(() => {
    if (!appIsInit || !q || !isMounted) return

    dispatch(restoreSearchData())
    dispatch(getSearchResult(q as string, filter as string, order as string))
  }, [filter, appIsInit, order, q, isMounted])

  const getPageTitlePrefix = () => {
    if (!isLogin) return 'Login to use this app'
    if (q) return `Searching issues for ${q}`
    return 'Homepage'
  }

  return (
    <Layout
      customMeta={{
        title: `${getPageTitlePrefix()} - Github Task Tracker`,
      }}
    >
      <PageContentContainer
        pageContentType={EPageContentType.SEARCH_RESULT}
        tableEmptyText={'暫無搜尋結果'}
        displayText={`Search${router.query?.q ? ' :' + router.query?.q : ''}`}
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
