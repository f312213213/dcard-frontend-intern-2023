import { FormEvent, MouseEventHandler } from 'react'
import {
  StyledSearchBar,
  StyledSearchButton,
  StyledSearchIcon,
  StyledSearchInput
} from '@/components/Header/Search/styles'

const Search = () => {
  const searchHandlerHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <StyledSearchBar onSubmit={searchHandlerHandler}>
      <StyledSearchInput />
      <StyledSearchButton
        type={'submit'}
      >
        <StyledSearchIcon />
      </StyledSearchButton>
    </StyledSearchBar>
  )
}

export default Search
