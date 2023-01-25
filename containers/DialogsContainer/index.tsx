import { isLoginDialogOpenSelector } from '@/features/app/selector'
import { useAppSelector } from '@/features/store'
import dynamic from 'next/dynamic'

const LoginDialog = dynamic(() => import('@/components/Dialogs/LoginDialog'), { ssr: false })

const DialogsContainer = () => {
  const isLoginDialogOpen = useAppSelector(isLoginDialogOpenSelector)
  return (
    <>
      {isLoginDialogOpen && <LoginDialog/>}
    </>
  )
}

export default DialogsContainer
