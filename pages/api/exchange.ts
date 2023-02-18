import { EApiMethod } from '@/apis/apiClient'
import githubApi from '@/constants/githubApi'
import omit from 'lodash/omit'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  accessToken?: string
  message?: string
}

const exchangeCodeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const targetUrl = new URL(githubApi.accessToken)
  targetUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID ?? '')
  targetUrl.searchParams.set('client_secret', process.env.GITHUB_CLIENT_SECRET ?? '')
  targetUrl.searchParams.set('code', req.body.code)
  targetUrl.searchParams.set('redirect_uri', githubApi.callbackUrl)

  try {
    const response = await fetch(targetUrl.toString(), {
      method: EApiMethod.POST,
      headers: {
        Accept: 'application/json',
      },
    })
    // @ts-ignore
    if (response?.error) {
      const errormessage = await response.json()
      throw Error(JSON.stringify(errormessage))
    }
    const json = await response.json()
    if (json) {
      return res.status(200).json({ accessToken: json.access_token })
    }
  } catch (e: any) {
    return res.status(400).json(omit(JSON.parse(e.message), 'error_uri'))
  }
}
export default exchangeCodeHandler
