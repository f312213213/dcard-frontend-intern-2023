import { EInputType } from '@/components/InLineEdit'
import { EIssueStatus, statusOptions } from '@/constants/issueLabel'
import { EToastType } from '@/features/app/interface'
import {
  StyledActionArea, StyledDeleteButton,
  StyledLink,
  StyledSingleIssueViewWrapper
} from './styles'
import {
  StyledBodyInLineEdit,
  StyledTitleInLineEdit
} from '@/components/Dialogs/IssueDialog/styles'
import { StyledIssueStatusSelect } from '@/containers/IssueTable/styles'
import { StyledSeparator } from '@/containers/Sidebar/styles'
import { closeBackdrop, openBackdrop, openToast } from '@/features/app/slice'
import { deleteIssue } from '@/features/repo/services'
import {
  getFirstStatusLabel,
  getIssueLabelNameArray,
  removeStatusLabel,
  renderBackground,
  renderColor
} from '@/utilis/issueStatus'
import { isAppInitiatedSelector } from '@/features/app/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import set from 'lodash/set'
import useIsMounted from '@/hooks/useIsMounted'

interface IProps {
  contentData: any
}

const SingleIssueView = ({ contentData }: IProps) => {
  const {
    projectOwner,
    projectName,
    issueNumber,
  } = contentData
  const [issueData, setIssueData] = useState<any>(undefined)
  const [valueStatus, setValueStatus] = useState<any>(undefined)
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string | null>('')
  const dispatch = useAppDispatch()
  const isMounted = useIsMounted()
  const router = useRouter()

  const isAppInit = useAppSelector(isAppInitiatedSelector)

  const getSingleIssueData = async () => {
    dispatch(openBackdrop())
    const { data, success } = await apiRequest({
      endpoint: `/repos/${projectOwner}/${projectName}/issues/${issueNumber}`,
    })
    if (success) {
      setIssueData(data)
      setTitle(data.title)
      setBody(data.body)
    }
    dispatch(closeBackdrop())
  }

  useEffect(() => {
    if (!isAppInit || !isMounted) return
    getSingleIssueData()
  }, [isAppInit, isMounted])

  const onTitleUpdate = async (value: string) => {
    setTitle(value)
    await apiRequest({
      endpoint: `/repos/${contentData.projectOwner}/${contentData.projectName}/issues/${contentData.issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        title: value,
      },
    })
  }

  const onBodyUpdate = async (value: string) => {
    setBody(value)
    await apiRequest({
      endpoint: `/repos/${contentData.projectOwner}/${contentData.projectName}/issues/${contentData.issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        body: value,
      },
    })
  }

  const onError = (errorMessage: string) => {
    dispatch(openToast({
      type: EToastType.ERROR,
      title: errorMessage,
    }))
  }

  const onValueChange = async (value: string) => {
    const labelsWithoutStatusLabel = removeStatusLabel(getIssueLabelNameArray(issueData.labels) || [])
    setIssueData((draft: any) => set(draft, 'labels', [...labelsWithoutStatusLabel, value]))
    setValueStatus(value)
    await apiRequest({
      endpoint: `/repos/${contentData.projectOwner}/${contentData.projectName}/issues/${contentData.issueNumber}/labels`,
      method: EApiMethod.PUT,
      data: {
        labels: [
          ...labelsWithoutStatusLabel,
          value,
        ],
      },
    })
  }

  const clickHandler = async () => {
    dispatch(openBackdrop())
    const { success } = await apiRequest({
      endpoint: `/repos/${contentData.projectOwner}/${contentData.projectName}/issues/${issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        state: 'closed',
      },
    })
    if (success) {
      dispatch(openToast({ type: EToastType.SUCCESS, title: 'Remove successfully!' }))
      router.replace(`/browse/${contentData.projectOwner}/${contentData.projectName}`)
    }
    dispatch(closeBackdrop())
  }

  const status = useMemo(() => {
    return getFirstStatusLabel(getIssueLabelNameArray(issueData?.labels))
  }, [issueData?.labels, valueStatus])

  if (!issueData || !isMounted) return null

  return (
    <StyledSingleIssueViewWrapper>
      <p>
        #{issueNumber}
      </p>

      <StyledSeparator />
      <StyledTitleInLineEdit
        name={'title'}
        type={EInputType.TEXT}
        onConfirm={onTitleUpdate}
        defaultValue={title}
        value={title}
        required
        onError={onError}
        readViewFitContainerWidth
      />
      <StyledSeparator />

      <div style={{
        marginTop: '15px',
        height: '40px',
      }}>
        <StyledIssueStatusSelect
          value={status}
          defaultValue={status || EIssueStatus.OPEN}
          options={statusOptions}
          onValueChange={onValueChange}
          background={renderBackground((status || EIssueStatus.OPEN) as EIssueStatus)}
          color={renderColor((status || EIssueStatus.OPEN) as EIssueStatus)}
        />
      </div>

      <StyledSeparator />

      <StyledBodyInLineEdit
        name={'body'}
        type={EInputType.TEXTAREA}
        onConfirm={onBodyUpdate}
        defaultValue={body || ''}
        value={body || "This issue doesn't have a body."}
        minLength={30}
        onError={onError}
        keepEditViewOpenOnBlur
        readViewFitContainerWidth
      />
      <StyledActionArea>
        <StyledDeleteButton onClick={clickHandler}>
          刪除此 issue
        </StyledDeleteButton>
        <StyledLink href={issueData.url} target={'_blank'} rel={'noreferrer'}>
          前往 Issue
        </StyledLink>
      </StyledActionArea>
    </StyledSingleIssueViewWrapper>
  )
}

export default SingleIssueView
