import { StyledGitHubLoginIcon, StyledGitHubLoginLink } from '@/components/GitHubLogin/styles'
import { openBackdrop } from '@/features/app/slice'
import { useAppDispatch } from '@/features/store'
import { useRouter } from 'next/router'
import githubApi from '@/constants/githubApi'

const GitHubLogin = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  return (
    <StyledGitHubLoginLink
      onClick={() => dispatch(openBackdrop())}
      href={`${githubApi.loginRequest}?scope=repo&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL}${router.asPath}`}
    >
      <StyledGitHubLoginIcon />
      <span>Login with GitHub</span>
    </StyledGitHubLoginLink>
  )
}

export default GitHubLogin
