import { AiOutlineSearch } from 'react-icons/ai'
import { IISMobile } from '@/interfaces/global'
import styled from 'styled-components'

export const StyledSearchBar = styled.form`
  padding: 4px 0;
  display: flex;
  align-items: center;
  width: 100%;
`

export const StyledSearchInput = styled.input<IISMobile>`
  width: 300px;
  height: 100%;
  padding: 0 5px;
  border: 0.1px solid black;
  border-radius: 4px 0px 0px 4px;
  background-color: ${props => props.theme.color.mainDefault};
  color: ${props => props.theme.color.semiWhite};

  ${({ isMobile }) => isMobile && {
    width: '100%',
  }}

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.color.semiWhite};
  }
`

export const StyledSearchButton = styled.button`
  height: 100%;
  width: 30px;
  cursor: pointer;
  border: 0.1px solid black;
  border-radius: 0px 4px 4px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: none;
  
  background-color: ${props => props.theme.color.mainDefault};

  &:focus {
    outline: none;
  }
`

export const StyledSearchIcon = styled(AiOutlineSearch)`
  color: ${props => props.theme.color.semiWhite};
`
