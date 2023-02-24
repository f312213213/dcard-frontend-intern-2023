import { IISMobile } from '@/interfaces/global'
import styled from 'styled-components'

export const StyledMain = styled.main<IISMobile>`
  margin-top: 48px;
  position: relative;
  padding: 20px;

  background: ${props => props.theme.color.mainDark};


  width: calc(100% - 240px);
  height: calc(100vh - 48px);
  min-height: calc(100vh - 48px);
  margin-left: 240px;
  
  ${({ isMobile }) => isMobile && {
    width: '100%',
    marginLeft: '0',
    marginTop: '0',
  }}
`

export const StyledMobileMain = styled.main`
  width: calc(100% - 240px);
  height: calc(100vh - 48px);
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  position: relative;
  margin-left: 240px;
  padding: 20px;

  background: ${props => props.theme.color.mainDark};
`
