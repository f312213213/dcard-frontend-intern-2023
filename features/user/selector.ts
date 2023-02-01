import { RootState } from '@/features/store'

export const isLoginSelector = (state: RootState) => !!state?.user?.userData?.username

export const userDataSelector = (state: RootState) => state.user.userData

export const reposDataSelector = (state: RootState) => state.user.userData?.repos
