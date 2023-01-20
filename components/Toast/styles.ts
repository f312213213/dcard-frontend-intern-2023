import { BackgroundProps, background } from 'styled-system'
import { Close, Root, Title, Viewport } from '@radix-ui/react-toast'
import styled from 'styled-components'

export const StyledToastRoot = styled(Root)`
  list-style: none;
  
  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
`

export const StyledToastContainer = styled.div<BackgroundProps>`
  margin-right: 20px;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-radius: 10px;
  width: 300px;

  ${background}
`

export const StyledToastTitle = styled(Title)`

`

export const StyledToastCloseButton = styled(Close)`
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
  
  &:hover{
    background: ${props => props.theme.color.semiDark};
  }
`

export const StyledToastViewport = styled(Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
`
