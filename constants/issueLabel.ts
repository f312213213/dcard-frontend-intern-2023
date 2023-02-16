import values from 'lodash/values'

export enum EIssueStatus {
  DONE= 'DONE',
  IN_PROGRESS = 'IN PROGRESS',
  OPEN = 'OPEN'
}

const issueLabels = {
  [EIssueStatus.DONE]: {
    color: '006644',
    name: 'DONE',
  },
  [EIssueStatus.IN_PROGRESS]: {
    color: '0052CC',
    name: 'IN PROGRESS',
  },
  [EIssueStatus.OPEN]: {
    color: 'F4F5F7',
    name: 'OPEN',
  },
}

export const statusOptions = values(issueLabels).map(label => {
  return {
    id: label.name,
    text: label.name,
    value: label.name,
  }
})

export default issueLabels
