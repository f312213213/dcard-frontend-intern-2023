import { FormEvent, useEffect, useRef, useState } from 'react'
import {
  StyledSearchBar,
  StyledSearchButton,
  StyledSearchIcon,
  StyledSearchInput
} from '@/components/Header/Search/styles'
import { getSearchResult } from '@/features/repo/services'
import { restoreSearchData } from '@/features/repo/slice'
import { useAppDispatch } from '@/features/store'
import { useRouter } from 'next/router'
import useIsMounted from '@/hooks/useIsMounted'

const Search = () => {
  const [queryText, setQueryText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isMounted = useIsMounted()

  const { q, filter, order } = router.query

  const searchHandlerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!queryText) return
    dispatch(restoreSearchData())
    router.push(`/?q=${queryText}`, undefined, { shallow: true })
    dispatch(getSearchResult(q as string, filter as string, order as string))
  }

  useEffect(() => {
    if (q && isMounted) {
      dispatch(getSearchResult(q as string, filter as string, order as string))
    }
  }, [isMounted])

  return (
    <StyledSearchBar onSubmit={searchHandlerHandler}>
      <StyledSearchInput
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
