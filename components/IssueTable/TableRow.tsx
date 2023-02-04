import { ITask } from '@/features/task/interface'
import { StyledIssueTableRow } from '@/components/IssueTable/styles'
import { memo } from 'react'

interface IProps {
  task: ITask
}
const TableRow = ({ task }: IProps) => {
  return (
    <StyledIssueTableRow>
      <td>{task.title}</td>
      <td>{task.body}</td>
    </StyledIssueTableRow>
  )
}

export default memo(TableRow, (prevProps, nextProps) => {
  const { id: prevId } = prevProps.task
  const { id: nextId } = nextProps.task
  return prevId === nextId
})
