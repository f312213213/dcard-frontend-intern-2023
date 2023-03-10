import { EIssueStatus, statusOptions } from '@/constants/issueLabel'
import { EPageContentType } from '@/constants/pageContentType'
import { ITask } from '@/features/repo/interface'
import { StyledIssueStatusSelect, StyledIssueTableRow } from './styles'
import { memo } from 'react'
import { renderBackground, renderColor } from '@/utilis/issueStatus'
import { updateIssueStatus } from '@/features/repo/services'
import { useAppDispatch } from '@/features/store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useIsMobile from '@/hooks/useIsMobile'

interface IProps {
  task: ITask
  pageContentType?: EPageContentType
}
const TableRow = ({ task, pageContentType }: IProps) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const dispatch = useAppDispatch()
  const onValueChange = async (value: EIssueStatus) => {
    dispatch(updateIssueStatus(
      task.repoName,
      task.number,
      value,
      router.pathname === '/' ? EPageContentType.SEARCH_RESULT : EPageContentType.ISSUE_TABLE
    ))
  }

  return (
    <Link
      as={`/browse/${task.repoOwner}/${task.repoName}/${task.number}`}
      href={{
        pathname: router.pathname,
        query: {
          ...router.query,
          projectModalId: task.repoName,
          issueModalNumber: task.number,
        },
      }}
      shallow
    >
    <StyledIssueTableRow>
      <td className={'number'}>
        <p>
          {task.number}
        </p>
      </td>
      {
        pageContentType === EPageContentType.SEARCH_RESULT && (
          <td className={'repo'}>
            <p>
              {task.repoName}
            </p>
          </td>
        )
      }
      <td className={'title'}>
          <p>
            {task.title}
          </p>
      </td>
      <td className={'row-body'}>
        <p>
          {task.body}
        </p>
      </td>
      {
        !isMobile && (
          <td className={'status'}>
            <div>
              <StyledIssueStatusSelect
                defaultValue={task.status}
                value={task.status}
                options={statusOptions}
                onValueChange={onValueChange}
                background={renderBackground(task.status)}
                color={renderColor(task.status)}
              />
            </div>
          </td>
        )
      }
    </StyledIssueTableRow>
    </Link>
  )
}

export default memo(TableRow, (prevProps, nextProps) => {
  const {
    id: prevId,
    status: prevStatus,
    title: prevTitle,
    body: prevBody,
  } = prevProps.task

  const {
    id: nextId,
    status: nextStatus,
    title: nextTitle,
    body: nextBody,
  } = nextProps.task

  return (
    prevId === nextId &&
    prevStatus === nextStatus &&
    prevTitle === nextTitle &&
    prevBody === nextBody
  )
})
