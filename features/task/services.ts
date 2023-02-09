import { AppDispatch, RootState } from '@/features/store'
import { EToastType } from '@/features/app/interface'
import { appendTask, initTask } from '@/features/task/slice'
import { closeBackdrop, openBackdrop, openToast } from '@/features/app/slice'
import apiRequest from '@/apis/apiClient'

export const getIssueData = (filter = 'all') => async (dispatch: AppDispatch, getState: () => RootState) => {
  const username = getState().user.userData?.username
  const { page, hasMore, selectedProject, repoNotFound } = getState().task
  if (!username || !selectedProject || repoNotFound) return
  if (!hasMore) {
    dispatch(openToast({ type: EToastType.ERROR, title: 'There is no task anymore!' }))
    return
  }
  dispatch(openBackdrop())
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${username}/${selectedProject}/issues?state=${filter}&per_page=10&page=${page}`,
  })
  const tasks = data.map((issue: any) => {
    return {
      title: issue.title,
      body: issue.body,
      id: issue.node_id,
      number: issue.number,
      status: issue.state,
      repoName: selectedProject,
      url: issue.html_url,
    }
  })
  if (success) {
    if (page === 1) {
      dispatch(initTask({ tasks }))
    } else {
      dispatch(appendTask({ tasks }))
    }
  }
  dispatch(closeBackdrop())
}

export const getAllIssueData = (filter = 'all') => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { page, hasMore } = getState().task
  if (!hasMore) {
    dispatch(openToast({ type: EToastType.ERROR, title: 'There is no task anymore!' }))
    return
  }
  dispatch(openBackdrop())
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/issues?state=all&per_page=10&filter=all&state=${filter}&page=${page}`,
  })
  const tasks = data.map((issue: any) => {
    return {
      title: issue.title,
      body: issue.body,
      id: issue.node_id,
      number: issue.number,
      status: issue.state,
      repoName: issue.repository.name,
      url: issue.html_url,
    }
  })
  if (success) {
    if (page === 1) {
      dispatch(initTask({ tasks }))
    } else {
      dispatch(appendTask({ tasks }))
    }
  }

  dispatch(closeBackdrop())
}

export const getSingleIssueData = (issueNumber: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const username = getState().user.userData?.username
  const selectedProject = getState().task.selectedProject
  if (!username || !selectedProject) return
  dispatch(openBackdrop())
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${username}/${selectedProject}/issue/${issueNumber}`,
  })
  if (success) {
    // dispatch(appendTask({ tasks: data }))

  }

  dispatch(closeBackdrop())
}
