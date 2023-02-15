export enum EIssueStatus {
  DONE,
  IN_PROGRESS,
  OPEN
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

export default issueLabels
