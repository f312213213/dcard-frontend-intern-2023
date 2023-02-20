import { BackgroundProps, ColorProps, background, color } from 'styled-system'
import Select from '@/components/Select'
import styled from 'styled-components'

export const StyledIssueTableContainer = styled.div`
  width: 100%;
  height: 100%;
  &  table {
    max-width: 100%;
    width: 100%;
    height: 100%;
    display: block
  }
  
  &  * {
    display: block;
  }
`

export const StyledIssueTableEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 20px;
  color: ${props => props.theme.color.semiDark};
`

export const StyledIssueTableHeader = styled.tr`
  height: 30px;
  background: white;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 4px 8px;
  
  border-bottom: ${props => props.theme.color.gray} 2px solid;

  & > .number {
    flex-grow: 0.3;
  }

  & > .repo {
    flex-grow: 1;
    width: 0;
  }

  & > .status {
    width: 135px;
    text-align: right;
  }
  
  & > .title {
    padding-left: 10px;
    flex-grow: 1;
  }
  & > .row-body {
    padding-left: 10px;
    flex-grow: 3;
  }
`

export const StyledIssueTableRow = styled.tr`
  min-height: 60px;
  background: white;
  display: flex;
  align-items: center;
  text-align: left;
  transition: all 0.1s;
  border-radius: 4px;
  padding: 4px 8px;
  
  &:hover {
    background: ${props => props.theme.color.hoverDark};
  }
  
  & > .number {
    flex-grow: 0.3;
  }

  & > .repo {
    flex-grow: 1;
    width: 0;
    & > p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  & > .status > div {
    width: 135px;
  }

  & > .title {
    flex-grow: 1;
    width: 0;
    padding-right: 10px;
    & > p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  
  & > .row-body {
    flex-grow: 3;
    width: 0;
    & > p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`

export const StyledIssueTable = styled.table`
  width: 100%;
  height: 100%;
`

export const StyledIssueStatusSelect = styled(Select)<BackgroundProps & ColorProps>`
  display: inline-flex;
  float: right;
  padding: 10px;
  gap: 5px;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  
  ${background}
  ${color}
`
