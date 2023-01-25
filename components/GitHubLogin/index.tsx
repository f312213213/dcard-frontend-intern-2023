import { StyledGitHubLoginIcon, StyledGitHubLoginLink } from '@/components/GitHubLogin/styles'
import githubApi from '@/constants/githubApi'

const GitHubLogin = () => {
  return (
    <StyledGitHubLoginLink
      href={`${githubApi.loginRequest}?scope=repo&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
    >
      <StyledGitHubLoginIcon />
      <span>Login with GitHub</span>
    </StyledGitHubLoginLink>
  )
}

export default GitHubLogin
