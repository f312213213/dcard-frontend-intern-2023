import { Content, Description, Overlay, Title } from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const StyledDialogOverlay = styled(Overlay)`
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  
  background: ${props => props.theme.color.semiDark};
  
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const StyledDialogContent = styled(Content)`
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);


  background: ${props => props.theme.color.white};
  
  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  & :focus {
    outline: none;
  }
`

export const StyledDialogTitle = styled(Title)`
  margin: 0;
  font-weight: 500;
  color: #111111;
  font-size: 17px;
`

export const StyledDialogDescription = styled(Description)`
  margin: 10px 0 20px;
  color: #111111;
  font-size: 15px;
  line-height: 1.5;
  display: flex;
  justify-content: center;
`

export const StyledDialogCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  transition: all 0.3s;
  color: ${props => props.theme.color.mainDefault};

  &:hover{
    color: ${props => props.theme.color.white};
    background: ${props => props.theme.color.semiDark};
  }
`
