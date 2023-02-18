import { AppDispatch, RootState } from '@/features/store'
import { EToastType } from '@/features/app/interface'
import { appendTask, initTask, updateProjectHasLabelMap } from '@/features/task/slice'
import { closeBackdrop, openBackdrop, openToast } from '@/features/app/slice'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import forOwn from 'lodash/forown'
import issueLabels, { EIssueStatus } from '@/constants/issueLabel'

export const getIssueData = (filter = 'all') => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { page, hasMore, selectedProject } = getState().task
  const { userData } = getState().user
  if (!selectedProject) return
  if (!hasMore) {
    dispatch(openToast({ type: EToastType.ERROR, title: 'There is no task anymore!' }))
    return
  }
  dispatch(openBackdrop())
  const repoIndex = userData?.repos.findIndex((repo) => repo.repoName === selectedProject)
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${userData?.repos[repoIndex]?.repoOwner}/${selectedProject}/issues?state=open&per_page=10&page=${page}`,
  })
  const tasks = data.map((issue: any) => {
    return {
      title: issue.title,
      body: issue.body,
      id: issue.node_id,
      number: issue.number,
      status: issue.labels[0]?.name || issueLabels[EIssueStatus.OPEN].name, // default status is "OPEN"
      repoName: selectedProject,
      url: issue.html_url,
    }
  })
  if (success) {
    if (page === 1) {
      dispatch(initTask({ tasks, selectedProject }))
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
    endpoint: `/issues?state=all&per_page=10&filter=all&state=open&page=${page}`,
  })
  const tasks = data.map((issue: any) => {
    return {
      title: issue.title,
      body: issue.body,
      id: issue.node_id,
      number: issue.number,
      status: issue.labels[0]?.name || issueLabels[EIssueStatus.OPEN].name,
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
