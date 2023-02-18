import { EIssueStatus, statusOptions } from '@/constants/issueLabel'
import { ITask } from '@/features/repo/interface'
import { StyledIssueStatusSelect, StyledIssueTableRow } from './styles'
import { memo, useState } from 'react'
import { renderBackground, renderColor } from '@/utilis/issueStatus'
import { updateIssueStatus } from '@/features/repo/services'
import { useAppDispatch } from '@/features/store'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface IProps {
  task: ITask
}
const TableRow = ({ task }: IProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const onValueChange = async (value: EIssueStatus) => {
    dispatch(updateIssueStatus(task.repoName, task.number, value))
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
