import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { HiOutlineSelector } from 'react-icons/hi'
import { IRepo } from '@/features/user/interface'
import {
  StyledSelectContent,
  StyledSelectIcon, StyledSelectItem, StyledSelectScrollDownButton, StyledSelectScrollUpButton,
  StyledSelectTrigger,
  StyledSelectViewport
} from '@/components/Sidebar/styles'
import { getIssueData, makeProjectLabels } from '@/features/task/services'
import { restoreTask, updateSelectedProject } from '@/features/task/slice'
import { useAppDispatch } from '@/features/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useIsMounted from '@/hooks/useIsMounted'
import * as Select from '@radix-ui/react-select'

interface IProps {
  reposData: IRepo[]
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

  return (
    <Select.Root value={router.query.projectName as string} defaultValue={defaultValue} onValueChange={onValueChange}>
      <StyledSelectTrigger>
        <Select.Value placeholder={'Select a project'} />
        <StyledSelectIcon>
          <HiOutlineSelector />
        </StyledSelectIcon>
      </StyledSelectTrigger>

      <Select.Portal>
        <StyledSelectContent>
          <StyledSelectScrollUpButton>
            <AiOutlineUp />
          </StyledSelectScrollUpButton>

          <StyledSelectViewport>
            {
              reposData.map((repo) => {
                return (
                  <StyledSelectItem key={repo.repoId} value={repo.repoName}>
                    <Select.ItemText>
                      {repo.repoName}
                    </Select.ItemText>
                    <Select.ItemIndicator />
                  </StyledSelectItem>
                )
              })
            }
          </StyledSelectViewport>
          <StyledSelectScrollDownButton>
            <AiOutlineDown />
          </StyledSelectScrollDownButton>

          <Select.Arrow />
        </StyledSelectContent>

      </Select.Portal>
    </Select.Root>
  )
}

export default RepoSelect
