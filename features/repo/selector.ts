import { IProject } from '@/features/repo/interface'
import { RootState } from '@/features/store'
import forOwn from 'lodash/forOwn'

export const selectedProjectTasksByProjectNameSelector = (selectedProject: string) => {
  return (state: RootState) => state.repo.projects[selectedProject]?.tasks || []
}

export const searchResultSelector = (state: RootState) => state.repo.search.tasks || []

export const searchedIssueDataSelector = (projectName: string, issueNumber: number) => (state: RootState) => {
  const searchedIssues = state.repo.search.tasks
  const issueIndex = searchedIssues.findIndex(issue => {
    return issue.number === issueNumber && issue.repoName === projectName
  })
  return searchedIssues[issueIndex]
}

export const issueDataByIdSelector = (selectedProject: string, issueNumber: number) => (state: RootState) => {
  const projectIssues = state.repo.projects[selectedProject]?.tasks
  const issueIndex = projectIssues.findIndex(issue => issue.number === issueNumber)
  return projectIssues[issueIndex]
}

export const selectedProjectSelector = (state: RootState) => state.repo.selectedProject

export const repoDataSelector = (state: RootState) => {
  const result: {
    repoOwner: string
    repoName: string
    repoId: string
  }[] = []
  const projects = state.repo.projects
  forOwn(projects, (value: IProject, key: string) => {
    result.push({
      repoOwner: value.repoOwner,
      repoName: key,
      repoId: value.repoId,
    })
  })
  return result
}
