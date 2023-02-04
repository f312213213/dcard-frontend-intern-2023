import styled from 'styled-components'

export const StyledMain = styled.main`
  width: calc(100% - 240px);
  height: calc(100vh - 48px);
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  position: relative;
  margin-left: 240px;
  padding: 20px;

  background: ${props => props.theme.color.mainDark};
`
