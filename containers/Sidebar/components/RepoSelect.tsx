import { IRepo } from '@/features/user/interface'
import { StyledSelect } from '../styles'
import { getIssueData, makeProjectLabels } from '@/features/task/services'
import { restoreTask, updateSelectedProject } from '@/features/task/slice'
import { useAppDispatch } from '@/features/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useIsMounted from '@/hooks/useIsMounted'

interface IProps {
  reposData: {
    repoName: string
    repoId: string
  }[]
}

const RepoSelect = ({ reposData }: IProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isMounted = useIsMounted()
  const defaultValue = router.pathname === '/' ? undefined : router.query.projectName as string || reposData[0].repoName
  const issueNumber = router.query.issueNumber
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const onValueChange = (value: string) => {
    setSelectedValue(value)
    router.push(`/browse/${value}`, undefined, { shallow: true })
  }

  useEffect(() => {
    if (!isMounted || !selectedValue || !!issueNumber) return
    dispatch(restoreTask())
    dispatch(updateSelectedProject({ selectedProject: selectedValue }))
    dispatch(getIssueData())
    dispatch(makeProjectLabels(selectedValue))
  }, [selectedValue, isMounted, issueNumber])

  useEffect(() => {
    dispatch(updateSelectedProject({ selectedProject: defaultValue }))
  }, [])

  useEffect(() => {
    if (router.query?.projectName && router.pathname !== '/') {
      dispatch(updateSelectedProject({ selectedProject: router.query?.projectName }))
      setSelectedValue(router.query?.projectName as string)
    }
  }, [router.query?.projectName])

  return (
    <StyledSelect
      value={router.query.projectName as string}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      options={reposData.map(repo => {
        return {
          id: repo.repoId,
          value: repo.repoName,
          text: repo.repoName,
        }
      })}
      placeholder={'Select a project'}
    />
  )
}

export default RepoSelect
