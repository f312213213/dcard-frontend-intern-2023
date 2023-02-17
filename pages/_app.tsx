import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'

import { EDialogType, EToastType } from '@/features/app/interface'
import { ParsedUrlQuery } from 'querystring'
import { openDialog, openToast } from '@/features/app/slice'
import { userLogin } from '@/features/user/slice'
import { wrapper } from '@/features/store'
import Backdrop from '@/containers/Backdrop'
import Dialogs from '@/containers/Dialogs'
import ErrorBoundaryToast from '@/components/Toast/ErrorBoundaryToast'
import Header from '@/containers/Header'
import Sidebar from '@/containers/Sidebar'
import Toast from '@/containers/Toast'
import apiRequest, { EApiMethod, setupApiCallerAuth } from '@/apis/apiClient'
import githubApi from '@/constants/githubApi'
import theme from '@/styles/theme'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryToast}>
            <NextNProgress options={{ showSpinner: false }} />
            <Backdrop />
            <Dialogs />
            <Header />
            <Sidebar />
            <Component {...props.pageProps} />
            <Toast />
            {/* <Footer /> */}
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  )
}

interface ICallBackCode extends ParsedUrlQuery {
  code: string
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }: AppContext) => {
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
  }
  const { req, res, query } = ctx

  if (req) {
    // @ts-ignore
    const { accessToken } = req.cookies
    if (accessToken) {
      try {
        const userData = await getUserData(accessToken)
        store.dispatch(userLogin({ userData }))
        return {
          pageProps: {
            pageProps,
          },
        }
      } catch (e) {
        // 失敗的話代表 token 過期，清掉 cookie 裡的紀錄
        // @ts-ignore
        res.setHeader('Set-Cookie', 'accessToken=123; max-age=0; path=/')
        store.dispatch(openDialog({ type: EDialogType.LOGIN }))
        store.dispatch(openToast({ type: EToastType.ERROR, title: 'Login session expired!' }))

        return {
          pageProps: {
            pageProps,
          },
        }
      }
    }

    const { code } = query as ICallBackCode
    if (code) {
      const targetUrl = new URL(githubApi.accessToken)
      targetUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '')
      targetUrl.searchParams.set('client_secret', process.env.GITHUB_CLIENT_SECRET ?? '')
      targetUrl.searchParams.set('code', code)
      targetUrl.searchParams.set('redirect_uri', githubApi.callbackUrl)

      try {
        const { data: jsonForToken, success: tokenSuccess } = await apiRequest({
          endpoint: targetUrl.toString(),
          method: EApiMethod.POST,
        })
        if (!tokenSuccess) {
          throw new Error()
        }

        const {
          access_token: accessToken,
        } = jsonForToken

        // 成功拿到 token
        const userData = await getUserData(accessToken)
        store.dispatch(userLogin({ userData }))

        // @ts-ignore
        res.setHeader('Set-Cookie', `accessToken=${accessToken}; max-age=28800; path=/`)

        return {
          pageProps: {
            pageProps,
          },
        }
      } catch (e) {
        // 如過這邊有錯誤，代表與 github 的驗證錯誤
        store.dispatch(openDialog({ type: EDialogType.LOGIN }))
        return {
          pageProps: {
            pageProps,
          },
        }
      }
    }
  }
  store.dispatch(openDialog({ type: EDialogType.LOGIN }))
  return {
    pageProps: {
      pageProps,
    },
  }
})

const getUserData = async (accessToken: string) => {
  setupApiCallerAuth({ accessToken })
  const { data: jsonForUserData, success: userInfoSuccess } = await apiRequest({
    endpoint: `${githubApi.baseUrl}/user`,
  })
  if (!userInfoSuccess) throw new Error()

  const {
    repos_url: reposUrl,
    login: username,
    avatar_url: avatarUrl,
    node_id: userId,
  } = jsonForUserData

  const { data: jsonForReposData, success: reposDataSuccess } = await apiRequest({
    endpoint: '/user/repos?per_page=100',
  })

  if (!reposDataSuccess) throw new Error()

  const reposData = jsonForReposData.map((repo: any) => {
    return {
      repoOwner: repo.owner.login,
      repoId: repo.node_id,
      repoName: repo.name,
      link: repo.html_url,
    }
  })

  return {
    username,
    repos: reposData,
    avatarUrl,
    userId,
  }
}

export default App
