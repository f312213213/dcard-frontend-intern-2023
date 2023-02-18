import { Content, Description } from '@radix-ui/react-dialog'
import Select from '@/components/Select'
import styled from 'styled-components'

export const StyledButton = styled.button`
  padding: 10px 15px;
  background: #222222;
  border-radius: 5px;
  width: 200px;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
  text-align: center;
  display: block;
  cursor: pointer;
  border: none;
  
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  color: ${props => props.theme.color.white};
`

export const StyledDialogDescription = styled(Description)`
  margin: 0 0 20px;
  padding: 10px 10px;
  color: #111111;
  font-size: 15px;
  line-height: 1.5;
  display: flex;
  text-align: left;
  flex-direction: column;
  justify-content: space-between;
  height: 67.5vh;
  overflow-y: auto;
`

export const StyledDialogContent = styled(Content)`
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  min-width: 550px;
  max-width: 770px;
  height: 100%;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;


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
  
  &:focus {
    outline: none;
  }
`

export const StyledSelect = styled(Select)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  margin-bottom: 10px;

  font-size: 16px;

  &:focus {
    outline: none;
  }
`