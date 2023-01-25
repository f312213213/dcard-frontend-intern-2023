import { Content, Icon, Item, ScrollDownButton, ScrollUpButton, Trigger, Viewport } from '@radix-ui/react-select'
import styled from 'styled-components'

export const StyledSidebarWrapper = styled.div`
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;

  background:${props => props.theme.color.white};
`

export const StyledSelectTrigger = styled(Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: white;
  color: black;
  border: none;
  transition: 0.3s;
  cursor: pointer;

  &:focus {
    border: none;
  }
`

export const StyledSelectIcon = styled(Icon)`

`

export const StyledSelectContent = styled(Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);

`

export const StyledSelectViewport = styled(Viewport)`
  padding: 5px;
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
