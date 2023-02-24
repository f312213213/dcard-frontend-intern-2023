import { FormEvent, useRef, useState } from 'react'
import {
  StyledSearchBar,
  StyledSearchButton,
  StyledSearchIcon,
  StyledSearchInput
} from '@/components/Header/Search/styles'
import { useRouter } from 'next/router'
import useIsMobile from '@/hooks/useIsMobile'

const Search = () => {
  const [queryText, setQueryText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const isMobile = useIsMobile()

  const { q } = router.query

  const searchHandlerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!queryText) return
    router.push(`/?q=${queryText}`, undefined, { shallow: true })
  }

  return (
    <StyledSearchBar onSubmit={searchHandlerHandler}>
      <StyledSearchInput
        isMobile={isMobile}
        defaultValue={router.query?.q}
        type={'text'}
        placeholder={'Search for issue!'}
        ref={inputRef}
        onChange={() => {
          if (!inputRef?.current) return
          setQueryText(inputRef?.current.value)
        }}
      />
      <StyledSearchButton
        type={'submit'}
      >
        <StyledSearchIcon />
      </StyledSearchButton>
    </StyledSearchBar>
  )
}

export default Search
