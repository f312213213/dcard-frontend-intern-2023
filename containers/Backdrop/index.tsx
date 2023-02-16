import { useAppSelector } from '@/features/store'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Backdrop = dynamic(() => import('@/components/Backdrop'), { ssr: false })

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
