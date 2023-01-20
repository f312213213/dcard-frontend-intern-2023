import { ParsedUrlQuery } from 'querystring'
import { fetch } from 'next/dist/compiled/@edge-runtime/primitives/fetch'
import { initApp } from '@/features/app/slice'
import { isLoginSelector, userDataSelector } from '@/features/user/selector'
import { useAppSelector, wrapper } from '@/features/store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { userLogin } from '@/features/user/slice'
import Layout from '@/components/Layout'
import githubApi from '@/constants/githubApi'

const HomePage = () => {
  const router = useRouter()
  const isLogin = useAppSelector(isLoginSelector)
  const userData = useAppSelector(userDataSelector)

  useEffect(() => {
    router.replace('/', undefined, { shallow: true })
  }, [])

  return (
    <Layout>
      {
        isLogin
          ? <p>登入啦！ hi! {userData.login}</p>
          : <a
            className={'login-link'}
            href={`${githubApi.loginRequest}?scope=repo&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}

          >
            <span>Login with GitHub</span>
          </a>

      }

    </Layout>
  )
}

export default HomePage

interface ICallBackCode extends ParsedUrlQuery {
  code: string
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { accessToken } = context.req.cookies
  const { res } = context
  // cookie 裡已經有 accessToken 了，直接打 api 要使用者資料
  if (accessToken) {
    try {
      const userData = await getUserData(accessToken)
      store.dispatch(userLogin({ userData }))
      store.dispatch(initApp())
      return {
        props: {},
      }
    } catch (e) {
      // 失敗的話代表 token 過期，清掉 cookie 裡的紀錄
      res.setHeader('Set-Cookie', 'accessToken=123; max-age=0')
      return {
        props: {},
      }
    }
  }

  const { code = '' } = context.query as ICallBackCode

  // 有 callback code 代表是第一次註冊或是之前的 token 過期，跟 github 要 token
  if (code) {
    const targetUrl = new URL(githubApi.accessToken)
    targetUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '')
    targetUrl.searchParams.set('client_secret', process.env.GITHUB_CLIENT_SECRET ?? '')
    targetUrl.searchParams.set('code', code)
    targetUrl.searchParams.set('redirect_uri', githubApi.callbackUrl)

    try {
      const responseForToken = await fetch(targetUrl.toString(), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })
      if (responseForToken.status !== 200) {
        throw new Error()
      }
      const jsonForToken = await responseForToken.json()

      if (jsonForToken.error) {
        throw new Error()
      }

      const {
        access_token: accessToken,
      } = jsonForToken

      // 成功拿到 token
      const userData = await getUserData(accessToken)
      store.dispatch(userLogin({ userData }))
      store.dispatch(initApp())

      res.setHeader('Set-Cookie', `accessToken=${accessToken}`)

      return {
        props: {},
      }
    } catch (e) {
      // 如過這邊有錯誤，代表與 github 的驗證錯誤
      return {
        props: {},
      }
    }
  }

  return {
    props: {},
  }
})

const getUserData = async (accessToken: string) => {
  const responseForUserData = await fetch(`${githubApi.baseUrl}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (responseForUserData.status !== 200) throw new Error()
  return await responseForUserData.json()
}
