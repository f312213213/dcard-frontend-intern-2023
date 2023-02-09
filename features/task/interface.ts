export interface ITask {
  title: string
  body: string | undefined
  id: number
  number: number
  status: string
}

export interface IState {
  page: number
  hasMore: boolean
  tasks: ITask[]
  selectedProject: string
}
