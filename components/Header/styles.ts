import { IISMobile } from '@/interfaces/global'
import styled from 'styled-components'

export const StyledHeader = styled.header`
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  z-index: 1;

  background: ${props => props.theme.color.mainDefault};
`

export const StyledHeaderText = styled.p`
  color: ${props => props.theme.color.white};
  font-size: 20px;
`

export const StyledCreatedIssueButton = styled.button`
  font-size: 18px;
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.defaultBlue};


  &:hover{
    background-color: ${props => props.theme.color.semiBlue};
  }
`

export const StyledMiddleSection = styled.div<IISMobile>`
  display: flex;
  gap: 10px;
  
  ${({ isMobile }) => isMobile && {
    width: '100%',
  }}
`
