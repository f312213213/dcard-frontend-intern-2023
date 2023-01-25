import styled from 'styled-components'

export const StyledMain = styled.main`
  width: 100%;
  height: calc(100vh - 48px);
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  position: relative;

  background: ${props => props.theme.color.mainDark};
`
