import { AppDispatch, RootState } from '@/features/store'
import { EDialogType, EToastType } from '@/features/app/interface'
import { closeBackdrop, openBackdrop, openDialog, openToast } from '@/features/app/slice'
import { fetchUserInfo } from '@/features/user/services'
import { initProjectsData } from '@/features/repo/slice'
import { parseCookie, setCookie } from '@/utilis/auth'
import apiClient, { EApiMethod, setupApiCallerAuth } from '@/apis/apiClient'

export const initApp = ({ code }: {code: string | undefined}) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(openBackdrop())

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
      setupApiCallerAuth({ accessToken: data.accessToken })
      isLogin = await dispatch(fetchUserInfo())
    } else {
      dispatch(openToast({ type: EToastType.ERROR, title: 'Github login error!' }))
      dispatch(closeBackdrop())
      dispatch(openDialog({ type: EDialogType.LOGIN }))
      return
    }
  } else {
    const { accessToken } = parseCookie(document.cookie)
    if (accessToken) {
      setupApiCallerAuth({ accessToken })
      isLogin = await dispatch(fetchUserInfo())
    }
  }

  if (!isLogin) {
    setCookie('accessToken', '', 0)
    dispatch(closeBackdrop())
    dispatch(openDialog({ type: EDialogType.LOGIN }))
    dispatch(openToast({ type: EToastType.ERROR, title: 'Github login expire!' }))
    return
  }

  // 製作 repoData
  const userRepoData = getState().user.userData?.repos
  if (!userRepoData) {
    return dispatch(openToast({ type: EToastType.ERROR, title: 'There are no repo in your account!' }))
  }
  dispatch(initProjectsData({ projects: userRepoData }))
}
