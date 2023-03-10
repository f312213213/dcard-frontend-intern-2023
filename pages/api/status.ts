import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status?: string
  message?: string
}

const checkStatusHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const response = await fetch('https://www.githubstatus.com/api/v2/components.json', {
      headers: {
        Accept: 'application/json',
      },
    })

    const json = await response.json()

    const apiComponent = json.components.find((component: any) => component.name === 'API Requests')

    if (apiComponent.status !== 'operational') {
      throw Error()
    }

    return res
      .setHeader('Cache-Control', 'max-age=20, public')
      .status(200)
      .json({ status: 'operating' })
  } catch (e: any) {
    return res
      .setHeader('Cache-Control', 'max-age=20, public')
      .status(500)
      .json({ status: 'outage' })
  }
}
export default checkStatusHandler
