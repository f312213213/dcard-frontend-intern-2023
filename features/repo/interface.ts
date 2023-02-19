import { EIssueStatus } from '@/constants/issueLabel'

export interface ITask {
  title: string
  body: string | undefined
  id: number
  number: number
  status: EIssueStatus
  repoName: string
  repoOwner: string
  url: string
  labels: string[]
}

export interface IProject {
  page: number
  hasMore: boolean
  hasLabel: boolean
  repoOwner: string
  total: number
  repoName: string
  repoId: string
  tasks: ITask[]
}

export interface IState {
  selectedProject: string
  projects: {
    [key: string]: IProject
  }
}
