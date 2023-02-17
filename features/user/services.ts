import { AppDispatch, RootState } from '@/features/store'
import { EDialogType, EToastType } from '@/features/app/interface'
import { closeBackdrop, openBackdrop, openDialog, openToast } from '@/features/app/slice'
import { userLogin } from '@/features/user/slice'
import apiRequest from '@/apis/apiClient'
import githubApi from '@/constants/githubApi'

export const fetchUserInfo = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch(openBackdrop())
    const { data: jsonForUserData, success: userInfoSuccess } = await apiRequest({
      endpoint: `${githubApi.baseUrl}/user`,
    })
    if (!userInfoSuccess) throw Error()

    const {
      repos_url: reposUrl,
      login: username,
      avatar_url: avatarUrl,
      node_id: userId,
    } = jsonForUserData

    const { data: jsonForReposData, success: reposDataSuccess } = await apiRequest({
      endpoint: `${githubApi.baseUrl}/user/repos?per_page=100`,
    })

    if (!reposDataSuccess) throw Error()

    const reposData = jsonForReposData.map((repo: any) => {
      return {
        repoOwner: repo.owner.login,
        repoId: repo.node_id,
        repoName: repo.name,
        link: repo.html_url,
      }
    })

    const userData = {
      username,
      repos: reposData,
      avatarUrl,
      userId,
    }

    dispatch(userLogin({ userData }))
    dispatch(closeBackdrop())
    return true
  } catch (e) {
    console.error('[app init] login failed')
    dispatch(openDialog({ type: EDialogType.LOGIN }))
    dispatch(openToast({ type: EToastType.ERROR, title: 'Github login error!' }))
    dispatch(closeBackdrop())
    return false
  }
}
