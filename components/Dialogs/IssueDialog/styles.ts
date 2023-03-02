import { Content, Description, Title } from '@radix-ui/react-dialog'
import { IISMobile } from '@/interfaces/global'
import InLineEdit from '@/components/InLineEdit'
import styled from 'styled-components'

export const StyledLink = styled.a`
  padding: 10px 15px;
  background: #222222;
  border-radius: 5px;
  width: 200px;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
  text-align: center;
  display: block;

  color: ${props => props.theme.color.white};
`

export const StyledDeleteButton = styled.button`
  padding: 10px 15px;
  background: red;
  border-radius: 5px;
  width: 200px;
  border: none;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
  text-align: center;
  display: block;
  cursor: pointer;


  color: ${props => props.theme.color.white};
`

export const StyledDialogTitle = styled(Title)`
  margin: 0;
  font-weight: 500;
  color: #111111;
  font-size: 17px;
  height: 90px;
`

export const StyledActionArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  gap: 10px;
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
  height: 400px;
  overflow-y: auto;
`

export const StyledDialogContent = styled(Content)<IISMobile>`
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

  ${({ isMobile }) => isMobile && {
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',

    height: '80%',
  }}


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

export const StyledTitleInLineEdit = styled(InLineEdit)`
  padding: 10px;
  font-size: 20px;
  height: 60px;
  display: flex;
  align-items: center;
`

export const StyledBodyInLineEdit = styled(InLineEdit)`
  white-space: break-spaces;
  padding: 10px;
  font-size: 18px;
  overflow-x: auto;
`
