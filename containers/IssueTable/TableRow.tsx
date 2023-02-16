import { ITask } from '@/features/task/interface'
import { StyledIssueStatusSelect, StyledIssueTableRow } from './styles'
import { memo, useState } from 'react'
import { updateIssueStatus } from '@/features/task/services'
import { useAppDispatch } from '@/features/store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import issueLabels, { EIssueStatus } from '@/constants/issueLabel'
import values from 'lodash/values'

interface IProps {
  task: ITask
}
const TableRow = ({ task }: IProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [taskStatus, setTaskStatus] = useState<EIssueStatus>(task.status)
  const onValueChange = async (value: EIssueStatus) => {
    dispatch(updateIssueStatus(task.repoName, task.number, value))
    setTaskStatus(value)
  }
  const options = values(issueLabels).map(label => {
    return {
      id: label.name,
      text: label.name,
      value: label.name,
    }
  })

  const renderBackground = (taskStatus: EIssueStatus) => {
    return `#${issueLabels[taskStatus]?.color || issueLabels[EIssueStatus.OPEN].color}`
  }

  const renderColor = (taskStatus: EIssueStatus) => {
    if (taskStatus === EIssueStatus.OPEN) return '#000000'
    if (taskStatus === EIssueStatus.IN_PROGRESS) return 'rgb(224, 235, 253)'
    if (taskStatus === EIssueStatus.DONE) return 'rgb(232, 251, 240)'
  }
  return (
    <Link
      as={`/browse/${task.repoName}/${task.number}`}
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
        {task.number}
      </td>
      <td className={'title'}>
          <p>
            {task.title}
          </p>
      </td>
      <td className={'row-body'}>{task.body}</td>
      <td className={'status'}>
        <StyledIssueStatusSelect
          defaultValue={task.status}
          options={options}
          onValueChange={onValueChange}
          background={renderBackground(taskStatus)}
          color={renderColor(taskStatus)}
        />
      </td>
    </StyledIssueTableRow>
    </Link>
  )
}

export default memo(TableRow, (prevProps, nextProps) => {
  const { id: prevId } = prevProps.task
  const { id: nextId } = nextProps.task
  return prevId === nextId
})