import { useEffect } from 'react'
import { useRouter } from 'next/router'
import omit from 'lodash.omit'

const useCleanupCode = () => {
  const router = useRouter()
  useEffect(() => {
    const queryWithoutCode = omit(router.query, 'code')
    router.replace({
      pathname: router.pathname,
      query: queryWithoutCode,
    }, undefined, { shallow: true })
  }, [])
}

export default useCleanupCode
