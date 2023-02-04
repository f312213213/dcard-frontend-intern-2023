import { ITask } from '@/features/task/interface'
import { StyledIssueTableContainer, StyledIssueTableEmpty, StyledIssueTableRow } from './styles'
import { TableVirtuoso } from 'react-virtuoso'
import TableRow from '@/components/IssueTable/TableRow'
import useIsMounted from '@/hooks/useIsMounted'

interface IProps {
  selectedProjectTasks: ITask[]
}

const IssueTable = ({ selectedProjectTasks }: IProps) => {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  if (selectedProjectTasks.length === 0) {
    return (
      <StyledIssueTableContainer>
        <StyledIssueTableEmpty>
          暫無資料
        </StyledIssueTableEmpty>
      </StyledIssueTableContainer>
    )
  }

  return (
    <StyledIssueTableContainer>
      <TableVirtuoso
        // useWindowScroll
        data={selectedProjectTasks}
        fixedHeaderContent={() => (
          <StyledIssueTableRow>
            <th>Name</th>
            <th >Description</th>
          </StyledIssueTableRow>
        )}
        itemContent={(index, task) => {
          return (
            <TableRow task={task}/>
          )
        }}
      />
    </StyledIssueTableContainer>
  )
}

export default IssueTable
