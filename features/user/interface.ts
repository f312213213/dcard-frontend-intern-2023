export interface IRepo {
  repoId: string
  repoName: string
  link: string
}

export interface IState {
  userData: {
    username: string
    repos: IRepo[]
    avatarUrl: string
    userId: string
  } | null
}
