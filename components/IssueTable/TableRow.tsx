import { ITask } from '@/features/task/interface'
import { StyledIssueTableRow, StyledRowLink } from '@/components/IssueTable/styles'
import { memo } from 'react'
import { useRouter } from 'next/router'

interface IProps {
  task: ITask
}
const TableRow = ({ task }: IProps) => {
  const router = useRouter()
  return (
    <StyledIssueTableRow>
      <td className={'number'}>
        {task.number}
      </td>
      <td className={'title'}>
        <StyledRowLink
          href={`/browse/${task.repoName}/${task.number}`}
          shallow
        >
          {task.title}
        </StyledRowLink>
      </td>
      <td className={'row-body'}>{task.body}</td>
      <td className={'status'}>
        {task.status}
      </td>
    </StyledIssueTableRow>
  )
}

export default memo(TableRow, (prevProps, nextProps) => {
  const { id: prevId } = prevProps.task
  const { id: nextId } = nextProps.task
  return prevId === nextId
})
