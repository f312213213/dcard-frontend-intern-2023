import { reposDataSelector } from '@/features/user/selector'
import { useAppSelector } from '@/features/store'
import Sidebar from '@/components/Sidebar'

const SidebarContainer = () => {
  const reposData = useAppSelector(reposDataSelector)
  if (!reposData) return null
  return (
    <Sidebar reposData={reposData} />
  )
}

export default SidebarContainer
