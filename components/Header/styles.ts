import styled from 'styled-components'

export const StyledHeader = styled.header`
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);

  background: ${props => props.theme.color.mainDefault};
`
