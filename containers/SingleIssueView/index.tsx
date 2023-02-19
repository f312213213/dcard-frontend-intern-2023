import { StyledSingleIssueViewWrapper } from '@/containers/SingleIssueView/styles'
import { closeBackdrop, openBackdrop } from '@/features/app/slice'
import { isAppInitiatedSelector } from '@/features/app/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect, useState } from 'react'
import InlineEdit from '@atlaskit/inline-edit'
import TextArea from '@atlaskit/textarea'
import TextField from '@atlaskit/textfield'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import set from 'lodash/set'

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
  const dispatch = useAppDispatch()

  const isAppInit = useAppSelector(isAppInitiatedSelector)

  const getSingleIssueData = async () => {
    dispatch(openBackdrop())
    const { data, success } = await apiRequest({
      endpoint: `/repos/${projectOwner}/${projectName}/issues/${issueNumber}`,
    })
    if (success) {
      setIssueData(data)
    }
    dispatch(closeBackdrop())
  }

  useEffect(() => {
    if (!isAppInit) return
    getSingleIssueData()
  }, [isAppInit])

  const onTitleUpdate = async (value: string) => {
    setIssueData((draft: any) => set(draft, 'title', value))
    await apiRequest({
      endpoint: `/repos/${contentData.projectOwner}/${contentData.projectName}/issues/${contentData.issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        title: value,
      },
    })
  }

  const onBodyUpdate = async (value: string) => {
    setIssueData((draft: any) => set(draft, 'body', value))
    await apiRequest({
      endpoint: `/repos/${contentData.projectOwner}/${contentData.projectName}/issues/${contentData.issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        body: value,
      },
    })
  }

  if (!issueData) return null

  return (
    <StyledSingleIssueViewWrapper>
      #{issueNumber}
      <InlineEdit
        onConfirm={onTitleUpdate}
        defaultValue={issueData.title}
        editView={({ errorMessage, ...fieldProps }) => (
          <TextField {...fieldProps} autoFocus style={{
            padding: '10px',
            fontSize: '20px',
          }} />
        )}
        readView={() => {
          return (
            <div
              style={{
                padding: '10px',
                fontSize: '22px',
              }}
            >
              {issueData.title}
            </div>
          )
        }}
      />
      <InlineEdit
        onConfirm={onBodyUpdate}
        defaultValue={issueData.body}
        keepEditViewOpenOnBlur
        readViewFitContainerWidth
        editView={({ errorMessage, ...fieldProps }, ref) => (
          // @ts-ignore - textarea does not pass through ref as a prop
          <TextArea {...fieldProps} ref={ref} />
        )}
        readView={() => {
          return (
            <p
              style={{
                whiteSpace: 'break-spaces',
                fontSize: '16px',
              }}
            >
              {issueData.body}
            </p>
          )
        }}
      />
    </StyledSingleIssueViewWrapper>
  )
}

export default SingleIssueView
