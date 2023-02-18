import { AppDispatch, RootState } from '@/features/store'
import { EDialogType, EToastType } from '@/features/app/interface'
import { appInitiated, closeBackdrop, openBackdrop, openDialog, openToast } from '@/features/app/slice'
import { deleteCookie, getCookie, setCookie } from '@/utilis/auth'
import { fetchUserInfo } from '@/features/user/services'
import { initProjectsData } from '@/features/repo/slice'
import apiClient, { EApiMethod, setupApiCallerAuth } from '@/apis/apiClient'

export const initApp = ({ code }: {code: string | undefined}) => async (dispatch: AppDispatch, getState: () => RootState) => {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
  }
  dispatch(openBackdrop())

  // check GitHub status
  const { data, success } = await apiClient({
    endpoint: `${window.location.origin}/api/status`,
  })
  if (!success || data.status !== 'operating') {
    dispatch(openToast({ type: EToastType.ERROR, title: 'There are some error on github server!' }))
  }

  const accessToken = getCookie('accessToken')
  let isLogin = false
  // 登入
  if (code) { // 跳轉回來的
    const { data, success } = await apiClient({
      endpoint: `${window.location.origin}/api/exchange`,
      method: EApiMethod.POST,
      data: { code },
    })

    if (success) {
      setCookie('accessToken', data.accessToken, 0.5)
      // window.location.reload()
      return
    } else {
      dispatch(openToast({ type: EToastType.ERROR, title: 'Github login error!' }))
      dispatch(closeBackdrop())
      dispatch(openDialog({ type: EDialogType.LOGIN }))
      return
    }
  } else {
    if (accessToken) {
      setupApiCallerAuth({ accessToken })
      isLogin = await dispatch(fetchUserInfo())
    }
  }

  if (!isLogin) {
    deleteCookie('accessToken')
    dispatch(closeBackdrop())
    dispatch(openDialog({ type: EDialogType.LOGIN }))
    if (accessToken) dispatch(openToast({ type: EToastType.ERROR, title: 'Github login expire!' }))
    return
  }

  const userRepoData = getState().user.userData?.repos
  if (!userRepoData) {
    return dispatch(openToast({ type: EToastType.ERROR, title: 'There are no repo in your account!' }))
  }
  dispatch(initProjectsData({ projects: userRepoData }))

  dispatch(appInitiated())
}
