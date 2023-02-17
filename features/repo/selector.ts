import { IProject } from '@/features/repo/interface'
import { RootState } from '@/features/store'
import forOwn from 'lodash/forown'

export const selectedProjectTasksByProjectNameSelector = (selectedProject: string) => {
  return (state: RootState) => state.repo.projects[selectedProject]?.tasks || []
}

export const selectedProjectSelector = (state: RootState) => state.repo.selectedProject

export const repoDataSelector = (state: RootState) => {
  const result: {
    repoName: string
    repoId: string
  }[] = []
  const projects = state.repo.projects
  forOwn(projects, (value: IProject, key: string) => {
    result.push({
      repoName: key,
      repoId: value.repoId,
    })
  })
  return result
}
