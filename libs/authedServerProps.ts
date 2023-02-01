import { ParsedUrlQuery } from 'querystring'

import { EDialogType } from '@/features/app/interface'
import { openDialog } from '@/features/app/slice'
import { userLogin } from '@/features/user/slice'
import { wrapper } from '@/features/store'
import githubApi from '@/constants/githubApi'

interface ICallBackCode extends ParsedUrlQuery {
  code: string
}

const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { accessToken } = context.req.cookies
  const { res } = context
  // cookie 裡已經有 accessToken 了，直接打 api 要使用者資料
  if (accessToken) {
    try {
      const userData = await getUserData(accessToken)
      store.dispatch(userLogin({ userData }))
      return {
        props: {},
      }
    } catch (e) {
      // 失敗的話代表 token 過期，清掉 cookie 裡的紀錄
      res.setHeader('Set-Cookie', 'accessToken=123; max-age=0')
      store.dispatch(openDialog({ type: EDialogType.LOGIN }))
      return {
        props: {},
      }
    }
  }

  const { code } = context.query as ICallBackCode

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

      const {
        access_token: accessToken,
      } = jsonForToken

      // 成功拿到 token
      const userData = await getUserData(accessToken)
      store.dispatch(userLogin({ userData }))

      res.setHeader('Set-Cookie', `accessToken=${accessToken}; max-age=3600`)

      return {
        props: {},
      }
    } catch (e) {
      // 如過這邊有錯誤，代表與 github 的驗證錯誤
      store.dispatch(openDialog({ type: EDialogType.LOGIN }))
      return {
        props: {},
      }
    }
  }

  store.dispatch(openDialog({ type: EDialogType.LOGIN }))
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
  const jsonForUserData = await responseForUserData.json()

  const {
    repos_url: reposUrl,
    login: username,
    avatar_url: avatarUrl,
    node_id: userId,
  } = jsonForUserData

  const responseForReposData = await fetch(reposUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (responseForReposData.status !== 200) throw new Error()
  const jsonForReposData = await responseForReposData.json()

  const reposData = jsonForReposData.map((repo: any) => {
    return {
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

export default getServerSideProps
