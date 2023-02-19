import { EApiStatus } from '@/features/app/interface'
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
  apiStatus: EApiStatus
}

export interface IState {
  selectedProject: string
  search: {
    queryText: string
    tasks: ITask[]
    page: number
    hasMore: boolean
    total: number
    apiStatus: EApiStatus
  }
  projects: {
    [key: string]: IProject
  }
}
