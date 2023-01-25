import { useAppSelector } from '@/features/store'
import { useEffect } from 'react'
import Backdrop from '@/components/Backdrop'

const BackdropContainer = () => {
  const show = useAppSelector(state => state.app.backdrop.show)
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  if (!show) return null

  return (
    <Backdrop />
  )
}

export default BackdropContainer
