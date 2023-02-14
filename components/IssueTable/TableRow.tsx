import { ITask } from '@/features/task/interface'
import { StyledIssueTableRow } from '@/components/IssueTable/styles'
import { memo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
          <p>
            {task.title}
          </p>
        </Link>
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
