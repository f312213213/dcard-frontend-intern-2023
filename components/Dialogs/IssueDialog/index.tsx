import { Portal, Root } from '@radix-ui/react-dialog'

import { EIssueStatus, statusOptions } from '@/constants/issueLabel'
import { StyledDialogContent, StyledDialogDescription, StyledLink } from '@/components/Dialogs/IssueDialog/styles'
import { StyledDialogOverlay, StyledDialogTitle } from '@/components/Dialogs/LoginDialog/styles'
import { StyledIssueStatusSelect } from '@/containers/IssueTable/styles'
import { closeBackdrop, openBackdrop } from '@/features/app/slice'
import { renderBackground, renderColor } from '@/utilis/issueStatus'
import { updateIssueStatus } from '@/features/task/services'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { usernameSelector } from '@/features/user/selector'
import Head from 'next/head'
import InlineEdit from '@atlaskit/inline-edit'
import TextArea from '@atlaskit/textarea'
import TextField from '@atlaskit/textfield'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import useIsMounted from '@/hooks/useIsMounted'

const IssueDialog = () => {
  const router = useRouter()
  const isMounted = useIsMounted()
  const username = useAppSelector(usernameSelector)
  const [issueData, setIssueData] = useState<any>(undefined)
  const [taskStatus, setTaskStatus] = useState<EIssueStatus>(EIssueStatus.OPEN)
  const [issueTitle, setIssueTitle] = useState<string>('')
  const [issueBody, setIssueBody] = useState<string>('')
  const dispatch = useAppDispatch()

  const { projectModalId: repo, issueModalNumber: issueNumber } = router.query

  const getIssueData = async () => {
    dispatch(openBackdrop())
    const { data, success } = await apiRequest({
      endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${username}/${repo}/issues/${issueNumber}`,
    })
    if (success) {
      setIssueData(data)
      setIssueTitle(data.title)
      setIssueBody(data.body)
      setTaskStatus(data?.labels[0]?.name || EIssueStatus.OPEN)
    }
    dispatch(closeBackdrop())
  }

  const onValueChange = (value: EIssueStatus) => {
    dispatch(updateIssueStatus(repo as string, issueData.number, value))
    setTaskStatus(value)
  }

  const onTitleUpdate = async (value: string) => {
    setIssueTitle(value)
    // dispatch(updateIssueStatus(repo as string, issueData.number, value))
    const { data, success } = await apiRequest({
      endpoint: `/repos/${username}/${repo}/issues/${issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        title: value,
      },
    })
  }

  const onBodyUpdate = async (value: string) => {
    setIssueBody(value)
    // dispatch(updateIssueStatus(repo as string, issueData.number, value))
    const { data, success } = await apiRequest({
      endpoint: `/repos/${username}/${repo}/issues/${issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        body: value,
      },
    })
  }

  useEffect(() => {
    if (!isMounted) return
    getIssueData()
  }, [isMounted])

  return (
    <Root open>
      <Portal>
        <StyledDialogOverlay onClick={() => router.back()} />
        <StyledDialogContent>
          {
            issueData && (
              <>
                <Head>
                  <title>
                    {`${issueTitle} - Github Task Tracker`}
                  </title>
                </Head>
                <StyledDialogTitle>
                  #{issueData.number}
                  <br />
                  <div
                    style={{
                      transform: 'translateY(20px)',
                    }}
                  >
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
                          >{issueTitle}</div>
                        )
                      }}
                    />
                  </div>
                </StyledDialogTitle>

                <div style={{
                  marginTop: '15px',
                  height: '40px',
                }}>
                  <StyledIssueStatusSelect
                    defaultValue={taskStatus}
                    options={statusOptions}
                    onValueChange={onValueChange}
                    background={renderBackground(taskStatus)}
                    color={renderColor(taskStatus)}
                  />
                </div>

                <StyledDialogDescription>
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
                          {issueBody}
                        </p>
                      )
                    }}
                  />
                </StyledDialogDescription>

                <StyledLink href={issueData.html_url} target={'_blank'} rel={'noreferrer'}>
                  前往 Issue
                </StyledLink>
              </>
            )
          }
        </StyledDialogContent>
      </Portal>
    </Root>
  )
}

export default IssueDialog
