import issueLabels, { EIssueStatus } from '@/constants/issueLabel'

export const renderBackground = (taskStatus: EIssueStatus) => {
  return `#${issueLabels[taskStatus]?.color || issueLabels[EIssueStatus.OPEN].color}`
}

export const renderColor = (taskStatus: EIssueStatus) => {
  if (taskStatus === EIssueStatus.OPEN) return '#000000'
  if (taskStatus === EIssueStatus.IN_PROGRESS) return 'rgb(224, 235, 253)'
  if (taskStatus === EIssueStatus.DONE) return 'rgb(232, 251, 240)'
}
