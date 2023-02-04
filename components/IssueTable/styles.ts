import styled from 'styled-components'

export const StyledIssueTableContainer = styled.div`
  width: 100%;
  height: 100%;
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

export const StyledIssueTableRow = styled.div`
  height: 100px;
  background: white;
`
