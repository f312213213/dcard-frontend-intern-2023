import styled from 'styled-components'

export const StyledSingleIssueViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const StyledLink = styled.a`
  padding: 10px 15px;
  background: #222222;
  border-radius: 5px;
  width: 200px;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
  text-align: center;
  display: block;

  color: ${props => props.theme.color.white};
`

export const StyledDeleteButton = styled.button`
  padding: 10px 15px;
  background: red;
  border-radius: 5px;
  width: 200px;
  border: none;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
  text-align: center;
  display: block;
  cursor: pointer;


  color: ${props => props.theme.color.white};
`

export const StyledActionArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  bottom: 0;
  width: 100%;
  position: absolute;
`
