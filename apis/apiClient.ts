import axios from 'axios'

export enum EApiMethod {
  GET= 'GET',
  POST='POST'
}

const instance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
  },
})

const apiClient = (() => {
  const _apiClient: {[key: string]: any} = {}
  const methods = [EApiMethod.GET, EApiMethod.POST]

  methods.forEach((method) => {
    _apiClient[method] = (endPoint: string, {
      params, data,
    }: {params?: object, data?: object}) => {
      const config = {
        url: endPoint,
        params,
        data,
        method,
      }
      return instance.request(config)
    }
  })
  return _apiClient
})()

interface ISetupApiCallerAuth {
  accessTokenType?: string
  accessToken: string
}

export const setupApiCallerAuth = ({ accessTokenType = 'Bearer', accessToken }: ISetupApiCallerAuth) => {
  instance.defaults.headers.common = {
    Authorization: `${accessTokenType} ${accessToken}`,
  }
}

interface IApiRequest {
  endpoint: string
  method?: EApiMethod
  params?: object
  data?: object
  onError?: (e: any) => {}
}

const apiRequest = async ({ endpoint, params, data, onError, method = EApiMethod.GET }: IApiRequest) => {
  try {
    const responseData = await apiClient[method](endpoint, {
      params, data,
    })
    return {
      data: responseData.data,
      success: true,
    }
  } catch (e: any) {
    if (onError) {
      onError(e)
      return {
        data: null,
        success: false,
      }
    }
    return {
      data: null,
      success: false,
    }
  }
}

export default apiRequest
