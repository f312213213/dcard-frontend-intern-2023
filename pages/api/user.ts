import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  username?: string
  avatarUrl?: string
  userId?: string
  message?: string
}

const checkStatusHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .json({ message: 'invalid login' })
  }

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: req.headers.authorization,
      },
    })

    const userData = await response.json()

    if (!userData.login) {
      throw Error()
    }

    const {
      login: username,
      avatar_url: avatarUrl,
      node_id: userId,
    } = userData

    return res
      .setHeader('Cache-Control', 'max-age=3600, public')
      .status(200)
      .json({
        username,
        avatarUrl,
        userId,
      })
  } catch (e: any) {
    return res
      .status(400)
      .json({ message: 'invalid login' })
  }
}
export default checkStatusHandler
