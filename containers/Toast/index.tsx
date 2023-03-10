import { closeToast } from '@/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import dynamic from 'next/dynamic'

const Toast = dynamic(() => import('@/components/Toast'), { ssr: false })

const ToastContainer = () => {
  const toast = useAppSelector(state => state.app.toast)
  const dispatch = useAppDispatch()

  const parseCloseToast = (open: boolean) => {
    if (!open) {
      dispatch(closeToast())
    }
  }

  return (
    <Toast
      title={toast.title}
      open={!!toast.title}
      type={toast.type}
      onOpenChange={parseCloseToast}
    />
  )
}

export default ToastContainer
