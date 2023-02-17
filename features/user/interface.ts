export interface IRepo {
  repoId: string
  repoName: string
  link: string
  repoOwner: string
}

export interface IUserData {
  username: string
  repos: IRepo[]
  avatarUrl: string
  userId: string
}

export interface IState {
  userData: IUserData | null
}
