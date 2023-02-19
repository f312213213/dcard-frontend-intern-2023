import { AppDispatch, RootState } from '@/features/store'
import { EApiStatus } from '@/features/app/interface'
import { EPageContentType } from '@/constants/pageContentType'
import {
  appendProjectTaskData,
  appendSearchResult, updateRepoDataByField,
  updateSearchDataByField,
  updateSearchTaskDataByField,
  updateTaskDataByField
} from '@/features/repo/slice'
import { checkHasStatusLabel, getFirstStatusLabel, getIssueLabelNameArray, removeStatusLabel } from '@/utilis/issueStatus'
import { closeBackdrop, openBackdrop } from '@/features/app/slice'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import first from 'lodash/first'
import issueLabels, { EIssueStatus } from '@/constants/issueLabel'

export const updateIssueStatus = (
  repoName: string,
  issueNumber: number,
  status: string,
  type: EPageContentType
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  if (type === EPageContentType.ISSUE_TABLE || type === EPageContentType.SINGLE_ISSUE) {
    const { projects } = getState().repo
    const { repoOwner, tasks } = projects[repoName]

    // @ts-ignore
    const targetTask = first(tasks, (task) => task.number === issueNumber)

    const labelsWithoutStatusLabel = removeStatusLabel(targetTask?.labels || [])

    dispatch(updateTaskDataByField({
      projectName: repoName,
      issueNumber,
      field: 'status',
      updatedData: status,
    }))
    dispatch(updateTaskDataByField({
      projectName: repoName,
      issueNumber,
      field: 'labels',
      updatedData: [
        ...labelsWithoutStatusLabel,
        status,
      ],
    }))
    await apiRequest({
      endpoint: `/repos/${repoOwner}/${repoName}/issues/${issueNumber}/labels`,
      method: EApiMethod.PUT,
      data: {
        labels: [
          ...labelsWithoutStatusLabel,
          status,
        ],
      },
    })
  } else {
    const { search } = getState().repo
    const { tasks } = search

    // @ts-ignore
    const targetTask = first(tasks, (task) => task.number === issueNumber)

    const labelsWithoutStatusLabel = removeStatusLabel(targetTask?.labels || [])

    dispatch(updateSearchTaskDataByField({
      projectName: repoName,
      issueNumber,
      field: 'status',
      updatedData: status,
    }))
    dispatch(updateSearchTaskDataByField({
      projectName: repoName,
      issueNumber,
      field: 'labels',
      updatedData: [
        ...labelsWithoutStatusLabel,
        status,
      ],
    }))

    await apiRequest({
      endpoint: `/repos/${targetTask?.repoOwner}/${repoName}/issues/${issueNumber}/labels`,
      method: EApiMethod.PUT,
      data: {
        labels: [
          ...labelsWithoutStatusLabel,
          status,
        ],
      },
    })
  }
}

export const getRepoIssueData = (filter = 'all') => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedProject, projects } = getState().repo
  if (!selectedProject) return

  const { hasMore, page, repoOwner, apiStatus } = projects[selectedProject]

  if (!hasMore || apiStatus === EApiStatus.LOADING) return

  dispatch(updateRepoDataByField({ projectName: selectedProject, field: 'apiStatus', updatedData: EApiStatus.LOADING }))

  dispatch(openBackdrop())
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${repoOwner}/${selectedProject}/issues?state=open&per_page=10&page=${page}&labels=${filter !== 'all' ? filter : ''}`,
  })
  if (success) {
    const tasks = data.map((issue: any) => {
      const issueLabelsName = getIssueLabelNameArray(issue.labels)
      const issueHasStatusLabel = checkHasStatusLabel(issueLabelsName)
      return {
        title: issue.title,
        body: issue.body,
        id: issue.node_id,
        number: issue.number,
        status: issueHasStatusLabel ? getFirstStatusLabel(issueLabelsName) : issueLabels[EIssueStatus.OPEN].name, // default status is "OPEN"
        repoName: selectedProject,
        url: issue.html_url,
        repoOwner,
        labels: issueLabelsName,
      }
    })

    dispatch(updateRepoDataByField({ projectName: selectedProject, field: 'apiStatus', updatedData: EApiStatus.SUCCESS }))
    dispatch(appendProjectTaskData({
      projectName: selectedProject,
      projectTaskData: tasks,
    }))
  }

  dispatch(closeBackdrop())
}

export const getSearchResult = (queryText: string, filter = 'all') => async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState()
  const username = state.user.userData?.username
  const { page, hasMore, queryText: prevQueryText, apiStatus } = state.repo.search

  if ((!hasMore && prevQueryText === queryText) || apiStatus === EApiStatus.LOADING) return

  dispatch(updateSearchDataByField({ field: 'apiStatus', updatedData: EApiStatus.LOADING }))

  dispatch(openBackdrop())

  const { data, success } = await apiRequest({
    endpoint: `/search/issues?q=${queryText} in:title in:body user:${username} type:issue ${filter !== 'all' ? `label:"${filter}"` : ''}&per_page=10&page=${prevQueryText === queryText ? page : 1}&state=open`,
  })
  if (success) {
    const tasks = data.items.map((issue: any) => {
      const issueLabelsName = getIssueLabelNameArray(issue.labels)
      const issueHasStatusLabel = checkHasStatusLabel(issueLabelsName)

      const repoFullName = issue.repository_url.split('repos')[1].substring(1)

      const repoOwner = repoFullName.split('/')[0]

      const repoName = repoFullName.split('/')[1]

      return {
        title: issue.title,
        body: issue.body,
        id: issue.node_id,
        number: issue.number,
        status: issueHasStatusLabel ? getFirstStatusLabel(issueLabelsName) : issueLabels[EIssueStatus.OPEN].name, // default status is "OPEN"
        repoName,
        url: issue.html_url,
        repoOwner,
        labels: issueLabelsName,
      }
    })

    dispatch(updateSearchDataByField({ field: 'apiStatus', updatedData: EApiStatus.SUCCESS }))
    dispatch(appendSearchResult({ searchResult: tasks, queryText }))
  }

  dispatch(updateSearchDataByField({ field: 'apiStatus', updatedData: EApiStatus.FAILURE }))
  dispatch(closeBackdrop())
}
