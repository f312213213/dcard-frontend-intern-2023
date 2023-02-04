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
import { useRouter } from 'next/router'
import * as Select from '@radix-ui/react-select'

interface IProps {
  reposData: IRepo[]
}

const RepoSelect = ({ reposData }: IProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const defaultValue = router.query.projectName as string || reposData[0].repoName

  const onValueChange = (value: string) => {
    dispatch(updateSelectedProject({ selectedProject: value }))
    router.push(`/browse/${value}`, undefined, { shallow: true })
  }

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
