import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import styled from 'styled-components'

export const StyledBackdropContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props => props.theme.color.semiDark};
  z-index: ${props => props.theme.zIndex.backdrop};
`

export const StyledSpinner = styled(AiOutlineLoading3Quarters)`
  animation: spin 1s linear infinite;
  width: 25px;
  height: 25px;

  color: ${props => props.theme.color.white};

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
