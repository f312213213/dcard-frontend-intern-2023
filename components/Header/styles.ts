import styled from 'styled-components'

export const StyledHeader = styled.header`
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0;

  background: ${props => props.theme.color.mainDefault};
`
