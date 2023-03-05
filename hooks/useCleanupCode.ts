import { useEffect } from 'react'
import { useRouter } from 'next/router'
import omit from 'lodash/omit'
import useIsMounted from '@/hooks/useIsMounted'

const useCleanupCode = () => {
  const router = useRouter()
  const isMounted = useIsMounted()
  useEffect(() => {
    if (!isMounted) return
    const queryWithoutCode = omit(router.query, 'code')
    router.replace({
      pathname: router.pathname,
      query: queryWithoutCode,
    }, undefined, { shallow: true })
  }, [isMounted])
}

export default useCleanupCode
