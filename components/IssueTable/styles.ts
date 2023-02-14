import Link from 'next/link'
import styled from 'styled-components'

export const StyledIssueTableContainer = styled.div`
  width: 100%;
  height: 100%;
  &  table {
    width: 100%;
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
    flex: 0.3;
  }

  & > .state {
    flex: 0.3;
  }

  & > .title {
    flex: 1;
  }
  & > .row-body {
    flex: 2;
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
    flex: 0.3;
  }

  & > .state {
    flex: 0.3;
  }

  & > .title {
    flex: 1;
  }
  & > .row-body {
    flex: 2;
  }
`

export const StyledIssueTable = styled.table`
  width: 100%;
  height: 100%;
`
