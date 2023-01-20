import styled from 'styled-components'

export const StyledMain = styled.main`
  width: 100%;
  min-height: calc(100vh - 48px);
  margin-top: 48px;

  background: ${props => props.theme.color.mainDark};
`
