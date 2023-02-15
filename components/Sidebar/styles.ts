import { Content, Icon, Item, ScrollDownButton, ScrollUpButton, Trigger, Viewport } from '@radix-ui/react-select'
import Link from 'next/link'
import Select from '@/components/Select'
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

export const StyledSelect = styled(Select)`
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
