import { EIssueStatus } from '@/constants/issueLabel'

export interface ITask {
  title: string
  body: string | undefined
  id: number
  number: number
  status: EIssueStatus
  repoName: string
  url: string
}

export interface IState {
  page: number
  hasMore: boolean
  tasks: ITask[]
  selectedProject: string
  projectHasLabelMap: {
    [key: string]: boolean
  }
}
