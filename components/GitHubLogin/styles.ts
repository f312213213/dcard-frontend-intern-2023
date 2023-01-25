import { AiFillGithub } from 'react-icons/ai'
import styled from 'styled-components'

export const StyledGitHubLoginLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #222222;
  margin: 10px;
  border-radius: 5px;
  width: 200px;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
  
  color: ${props => props.theme.color.white};
`

export const StyledGitHubLoginIcon = styled(AiFillGithub)`
  font-size: 32px;
`
