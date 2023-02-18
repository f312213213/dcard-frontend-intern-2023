import { Portal, Root } from '@radix-ui/react-dialog'

import { EIssueStatus, statusOptions } from '@/constants/issueLabel'
import { StyledDialogContent, StyledDialogDescription, StyledLink } from '@/components/Dialogs/IssueDialog/styles'
import { StyledDialogOverlay, StyledDialogTitle } from '@/components/Dialogs/LoginDialog/styles'
import { StyledIssueStatusSelect } from '@/containers/IssueTable/styles'
import { issueDataByIdSelector } from '@/features/repo/selector'
import { renderBackground, renderColor } from '@/utilis/issueStatus'
import { updateIssueStatus } from '@/features/repo/services'
import { updateTaskDataByField } from '@/features/repo/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import Head from 'next/head'
import InlineEdit from '@atlaskit/inline-edit'
import TextArea from '@atlaskit/textarea'
import TextField from '@atlaskit/textfield'
import apiRequest, { EApiMethod } from '@/apis/apiClient'

const IssueDialog = () => {
  const router = useRouter()
  const { projectModalId: repoName, issueModalNumber: issueNumber } = router.query

  const issueData = useAppSelector(issueDataByIdSelector(repoName as string, Number(issueNumber)))
  const dispatch = useAppDispatch()

  const onValueChange = (value: EIssueStatus) => {
    dispatch(updateIssueStatus(repoName as string, issueData.number, value))
  }

  const onTitleUpdate = async (value: string) => {
    dispatch(updateTaskDataByField({
      projectName: repoName,
      issueNumber: issueData.number,
      field: 'title',
      updatedData: value,
    }))
    await apiRequest({
      endpoint: `/repos/${issueData.repoOwner}/${repoName}/issues/${issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        title: value,
      },
    })
  }

  const onBodyUpdate = async (value: string) => {
    dispatch(updateTaskDataByField({
      projectName: repoName,
      issueNumber: issueData.number,
      field: 'body',
      updatedData: value,
    }))
    await apiRequest({
      endpoint: `/repos/${issueData.repoOwner}/${repoName}/issues/${issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        body: value,
      },
    })
  }

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
                    {`${issueData.title} - Github Task Tracker`}
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
                        <TextField {...fieldProps} style={{
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
                          >{issueData.title}</div>
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
                    value={issueData.status}
                    defaultValue={issueData.status}
                    options={statusOptions}
                    onValueChange={onValueChange}
                    background={renderBackground(issueData.status)}
                    color={renderColor(issueData.status)}
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
                          {issueData.body}
                        </p>
                      )
                    }}
                  />
                </StyledDialogDescription>

                <StyledLink href={issueData.url} target={'_blank'} rel={'noreferrer'}>
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
