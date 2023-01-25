const githubApi = {
  loginRequest: 'https://github.com/login/oauth/authorize',
  baseUrl: 'https://api.github.com',
  accessToken: 'https://github.com/login/oauth/access_token',
  callbackUrl: process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL ?? '',
}

export default githubApi
