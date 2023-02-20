import { EPageContentType } from '@/constants/pageContentType'
import { ITask } from '@/features/repo/interface'
import { StyledIssueTableContainer, StyledIssueTableEmpty, StyledIssueTableHeader } from './styles'
import { TableVirtuoso } from 'react-virtuoso'
import TableRow from '@/containers/IssueTable/TableRow'
import debounce from 'lodash/debounce'
import useIsMounted from '@/hooks/useIsMounted'

interface IProps {
  selectedProjectTasks: ITask[]
  loadMore: any
  tableEmptyText?: string
  pageContentType?: EPageContentType
}

const IssueTable = ({ selectedProjectTasks, loadMore, pageContentType, tableEmptyText = '暫無資料' }: IProps) => {
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

  const debouncedLoadMore = debounce(loadMore, 100)

  return (
    <StyledIssueTableContainer>
      <TableVirtuoso
        data={selectedProjectTasks}
        endReached={debouncedLoadMore}
        fixedHeaderContent={() => (
          <StyledIssueTableHeader>
            <th className={'number'}>ID</th>
            {
              pageContentType === EPageContentType.SEARCH_RESULT && <th className={'repo'}>Repo</th>
            }
            <th className={'title'}>Title</th>
            <th className={'row-body'}>Description</th>
            <th className={'status'}>
              Status
            </th>
          </StyledIssueTableHeader>
        )}
        itemContent={(index, task) => {
          return (
            <TableRow task={task} pageContentType={pageContentType} />
          )
        }}
      />
    </StyledIssueTableContainer>
  )
}

export default IssueTable
