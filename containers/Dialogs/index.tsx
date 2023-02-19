import {
  isAlertDialogOpenSelector,
  isLoginDialogOpenSelector,
  isNewLoginDialogOpenSelector
} from '@/features/app/selector'
import { useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const LoginDialog = dynamic(() => import('@/components/Dialogs/LoginDialog'), { ssr: false })
const IssueDialog = dynamic(() => import('@/components/Dialogs/IssueDialog'), { ssr: false })
const NewIssueDialog = dynamic(() => import('@/components/Dialogs/NewIssueDialog'), { ssr: false })
const AlertDialog = dynamic(() => import('@/components/Dialogs/AlertDialog'), { ssr: false })

const DialogsContainer = () => {
  const router = useRouter()
  const isLoginDialogOpen = useAppSelector(isLoginDialogOpenSelector)
  const isNewLoginDialogOpen = useAppSelector(isNewLoginDialogOpenSelector)
  const isAlertDialogOpen = useAppSelector(isAlertDialogOpenSelector)
  const isIssueDialogOpen = !!router.query?.issueModalNumber
  return (
    <>
      {isLoginDialogOpen && <LoginDialog/>}
      {isIssueDialogOpen && <IssueDialog />}
      {isNewLoginDialogOpen && <NewIssueDialog />}
      {isAlertDialogOpen && <AlertDialog />}
    </>
  )
}

export default DialogsContainer
