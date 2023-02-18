/* eslint-disable camelcase */

import { EPageContentType } from '@/constants/pageContentType'
import { isLoginSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'
import useCleanupCode from '@/hooks/useCleanupCode'

const PageContentContainer = dynamic(() => import('@/containers/PageContent'))

const HomePage = () => {
  useCleanupCode()
  const isLogin = useAppSelector(isLoginSelector)
  return (
    <Layout
      customMeta={{
        title: `${isLogin ? 'Homepage' : 'Login to use this app'} - Github Task Tracker`,
      }}
    >
      <PageContentContainer
        pageContentType={EPageContentType.SEARCH_RESULT}
        tableEmptyText={'暫無搜尋結果'}
        displayText={'Search'}
        contentData={[]}
      />
    </Layout>
  )
}

export default HomePage
