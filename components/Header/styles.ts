import styled from 'styled-components'

export const StyledHeader = styled.header`
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  background: ${props => props.theme.color.mainDefault};
`

export const StyledHeaderText = styled.p`
  color: ${props => props.theme.color.white};
  font-size: 20px;
`
