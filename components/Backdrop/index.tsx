import { StyledBackdropContainer, StyledSpinner } from '@/components/Backdrop/styles'
import { useAppSelector } from '@/features/store'
import { useEffect } from 'react'

const Backdrop = () => {
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
    <StyledBackdropContainer className={'z-50 top-0 fixed w-full h-screen overflow-hidden flex justify-center items-center bg-gray-800/50'}>
      <StyledSpinner />
    </StyledBackdropContainer>
  )
}

export default Backdrop
