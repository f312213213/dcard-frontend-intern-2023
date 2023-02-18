import { ITask } from '@/features/repo/interface'
import {
  StyledIssueTableContainer,
  StyledIssueTableEmpty,
  StyledIssueTableHeader
} from './styles'
import { TableVirtuoso } from 'react-virtuoso'
import TableRow from './TableRow'
import useIsMounted from '@/hooks/useIsMounted'

interface IProps {
  selectedProjectTasks: ITask[]
  loadMore: any
  tableEmptyText?: string
}

const IssueTable = ({ selectedProjectTasks, loadMore, tableEmptyText = '暫無資料' }: IProps) => {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  if (selectedProjectTasks.length === 0) {
    return (
      <StyledIssueTableContainer>
        <StyledIssueTableEmpty>
          {tableEmptyText}
        </StyledIssueTableEmpty>
      </StyledIssueTableContainer>
    )
  }

  return (
    <StyledIssueTableContainer>
      <TableVirtuoso
        data={selectedProjectTasks}
        endReached={loadMore}
        fixedHeaderContent={() => (
          <StyledIssueTableHeader>
            <th className={'number'}>ID</th>
            <th className={'title'}>Title</th>
            <th className={'row-body'}>Description</th>
            <th className={'status'}>
              Status
            </th>
          </StyledIssueTableHeader>
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
