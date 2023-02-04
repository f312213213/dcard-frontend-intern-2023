import { AppDispatch, RootState } from '@/features/store'
import { appendTask } from '@/features/task/slice'
import { closeBackdrop, openBackdrop } from '@/features/app/slice'
import apiRequest from '@/apis/apiClient'

export const getIssueData = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const username = getState().user.userData?.username
  const selectedProject = getState().task.selectedProject
  if (!username || !selectedProject) return
  dispatch(openBackdrop())
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${username}/${selectedProject}/issues`,
  })
  if (success) {
    dispatch(appendTask({ tasks: data }))
  }

  dispatch(closeBackdrop())
}
