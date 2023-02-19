import { AppDispatch, RootState } from '@/features/store'
import { appendProjectTaskData, updateRepoDataByField, updateTaskDataByField } from '@/features/repo/slice'
import { checkHasStatusLabel, getFirstStatusLabel, getIssueLabelNameArray, removeStatusLabel } from '@/utilis/issueStatus'
import { closeBackdrop, openBackdrop, openToast } from '@/features/app/slice'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import first from 'lodash/first'
import forOwn from 'lodash/forOwn'
import issueLabels, { EIssueStatus } from '@/constants/issueLabel'

export const makeProjectLabels = (
  selectedProject: string
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const repoData = getState().repo.projects
  if (!repoData[selectedProject] || repoData[selectedProject].hasLabel) return

  const { repoOwner } = repoData[selectedProject]

  const { data, success } = await apiRequest({
    endpoint: `/repos/${repoOwner}/${selectedProject}/labels`,
  })
  let hasStatusLabel = false
  if (success) {
    hasStatusLabel = checkHasStatusLabel(data)
  }
  if (!hasStatusLabel) {
    forOwn(issueLabels, async (label) => {
      const { success } = await apiRequest({
        endpoint: `/repos/${repoOwner}/${selectedProject}/labels`,
        method: EApiMethod.POST,
        data: label,
      })
      if (success) {
        dispatch(updateRepoDataByField({
          projectName: selectedProject,
          field: 'hasLabel',
          updatedData: true,
        }))
      }
    })
  } else {
    dispatch(updateRepoDataByField({
      projectName: selectedProject,
      field: 'hasLabel',
      updatedData: true,
    }))
  }
}

export const updateIssueStatus = (
  repoName: string,
  issueNumber: number,
  status: string
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { projects } = getState().repo
  const { repoOwner, tasks } = projects[repoName]

  // @ts-ignore
  const labelsWithoutStatusLabel = removeStatusLabel(first(tasks, (task) => task.number === issueNumber).labels)

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
  dispatch(makeProjectLabels(repoName))

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
}

export const getRepoIssueData = (filter = 'all') => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { selectedProject, projects } = getState().repo
  if (!selectedProject) return

  const { hasMore, page, repoOwner } = projects[selectedProject]

  if (!hasMore) return

  dispatch(openBackdrop())
  const { data, success } = await apiRequest({
    endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${repoOwner}/${selectedProject}/issues?state=open&per_page=10&page=${page}`,
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
    dispatch(appendProjectTaskData({
      projectName: selectedProject,
      projectTaskData: tasks,
    }))

    if (tasks.length === 0) {
      dispatch(updateRepoDataByField({
        projectName: selectedProject,
        field: 'hasMore',
        updatedData: false,
      }))
    }
  }
  dispatch(closeBackdrop())
}
