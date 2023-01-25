import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { HiOutlineSelector } from 'react-icons/hi'
import { IRepo } from '@/features/user/interface'
import {
  StyledSelectContent,
  StyledSelectIcon, StyledSelectItem, StyledSelectScrollDownButton, StyledSelectScrollUpButton,
  StyledSelectTrigger,
  StyledSelectViewport
} from '@/components/Sidebar/styles'
import { updateSelectedProject } from '@/features/task/slice'
import { useAppDispatch } from '@/features/store'
import { useEffect } from 'react'
import * as Select from '@radix-ui/react-select'

interface IProps {
  reposData: IRepo[]
}

const RepoSelect = ({ reposData }: IProps) => {
  const dispatch = useAppDispatch()
  const defaultValue = reposData[0].repoName

  const onValueChange = (value: string) => {
    dispatch(updateSelectedProject({ selectedProject: value }))
  }

  useEffect(() => {
    dispatch(updateSelectedProject({ selectedProject: defaultValue }))
  }, [])

  return (
    <Select.Root defaultValue={reposData[0].repoName} onValueChange={onValueChange}>
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
