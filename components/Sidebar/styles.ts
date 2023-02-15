import { Content, Icon, Item, ScrollDownButton, ScrollUpButton, Trigger, Viewport } from '@radix-ui/react-select'
import Link from 'next/link'
import styled from 'styled-components'

export const StyledSidebarWrapper = styled.div`
  width: 240px;
  height: calc(100vh - 48px);
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  flex-direction: column;
  z-index: 1;
  padding: 20px 0;
`

export const StyledSidebarLoader = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 10px;
  
  background: ${props => props.theme.color.white};
`

export const StyledSelectTrigger = styled(Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: transparent;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  margin-bottom: 10px;

  font-size: 16px;
  color: ${props => props.theme.color.semiWhite};
  border-bottom: ${props => props.theme.color.white} 1px solid;

  &:focus {
    outline: none;
  }
`

export const StyledSelectIcon = styled(Icon)`

`

export const StyledSelectContent = styled(Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 1;
`

export const StyledSelectViewport = styled(Viewport)`
  padding: 5px;
  z-index: 1;
`

export const StyledSelectItem = styled(Item)`
  font-size: 13px;
  line-height: 1;
  color: #111111;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
  
  &[data-disabled] {
    pointer-events: none;
  }
  
  &[data-highlighted] {
    outline: none;
    color: #111111;


    background:${props => props.theme.color.semiDark};
  }
`

export const StyledSelectScrollDownButton = styled(ScrollDownButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: black;
  cursor: default;
`

export const StyledSelectScrollUpButton = styled(ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: black;
  cursor: default;
`

export const StyledSidebarFilterLink = styled(Link)`
  margin-right: 5px;
  margin-left: 5px;
  padding: 10px;
  border-radius: 5px;
  color: ${props => props.theme.color.semiWhite};
  
  &:hover {
    background:${props => props.theme.color.semiDark};
  }
`
