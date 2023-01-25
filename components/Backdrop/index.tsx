import { StyledBackdropContainer, StyledSpinner } from '@/components/Backdrop/styles'

const Backdrop = () => {
  return (
    <StyledBackdropContainer className={'z-50 top-0 fixed w-full h-screen overflow-hidden flex justify-center items-center bg-gray-800/50'}>
      <StyledSpinner />
    </StyledBackdropContainer>
  )
}

export default Backdrop
