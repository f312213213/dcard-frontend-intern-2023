import cloneDeep from 'lodash/cloneDeep'
import findIndex from 'lodash/findIndex'
import issueLabels, { EIssueStatus } from '@/constants/issueLabel'
import remove from 'lodash/remove'

export const renderBackground = (taskStatus: EIssueStatus) => {
  return `#${issueLabels[taskStatus]?.color || issueLabels[EIssueStatus.OPEN].color}`
}

export const renderColor = (taskStatus?: EIssueStatus) => {
  if (taskStatus === EIssueStatus.OPEN) return '#000000'
  if (taskStatus === EIssueStatus.IN_PROGRESS) return 'rgb(224, 235, 253)'
  if (taskStatus === EIssueStatus.DONE) return 'rgb(232, 251, 240)'
}

export const labelIsStatusLabel = (label: string) => {
  return (
    label === issueLabels[EIssueStatus.OPEN].name ||
    label === issueLabels[EIssueStatus.IN_PROGRESS].name ||
    label === issueLabels[EIssueStatus.DONE].name
  )
}

export const checkHasStatusLabel = (labels: any[]) => {
  if (labels[0]?.name) {
    return labels.some((label: any) => labelIsStatusLabel(label.name))
  } else {
    return labels.some((label: any) => labelIsStatusLabel(label))
  }
}

export const getIssueLabelNameArray = (labels: any[]) => {
  return labels.map((label:any) => label.name)
}

export const getFirstStatusLabel = (labels: string[]) => {
  return labels[findIndex(labels, (label: string) => labelIsStatusLabel(label))]
}

export const removeStatusLabel = (labels: string[]) => {
  const copied = cloneDeep(labels)
  remove(copied, (label: string) => labelIsStatusLabel(label))
  return copied
}

export const getStatusFilterText = (filterText: string) => {
  switch (filterText) {
    case 'in-progress': return EIssueStatus.IN_PROGRESS
    case 'done': return EIssueStatus.DONE
    case 'open': return EIssueStatus.OPEN
    default: return ''
  }
}
