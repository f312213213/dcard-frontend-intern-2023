import { isMobile } from 'react-device-detect'
import { useEffect, useState } from 'react'

const useIsMobile = () => {
  const [isMobileClient, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobile)
  }, [])

  return isMobileClient
}

export default useIsMobile
