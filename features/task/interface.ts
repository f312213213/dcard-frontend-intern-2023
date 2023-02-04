export interface ITask {
  title: string | undefined
  body: string | undefined
  id: number
}

export interface IState {
  tasks: ITask[]
  selectedProject: string
}
