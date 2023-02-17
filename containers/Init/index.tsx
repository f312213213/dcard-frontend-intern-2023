import { initApp } from '@/features/app/services'
import { useAppDispatch } from '@/features/store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useIsMounted from '@/hooks/useIsMounted'

const Init = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isMounted = useIsMounted()
  useEffect(() => {
    if (isMounted) dispatch(initApp({ code: router.query.code as string }))
  }, [isMounted])
  return null
}

export default Init
